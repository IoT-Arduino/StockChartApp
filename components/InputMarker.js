// <!-- 必要なものをimport -->
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

export default function InputMarker({ user, ticker }) {
  //  <!-- marker -->
  const [markers, setMarkers] = useState([])
  //  <!-- 入力したmarker -->
  const [newMarkerText, setNewMarkerText] = useState('')
  const [newDate, setNewDate] = useState('')
  const [editItem,setEditItem] = useState('')
  const [errorText, setError] = useState('')

  useEffect(() => {
    fetchMarkers()
  }, [])

  // <!-- supabaseに接続 -->
  const fetchMarkers = async () => {
    //   <!-- .from(table名).select('カラム名').order(ソートの条件) -->
    let { data: markers, error } = await supabase
      .from('marker')
      .select('*')
      .eq('ticker', ticker)
      .order('id', true)
    if (error) console.log('error', error)
    else setMarkers(markers)
  }

  //  <!-- markerの追加 -->
  const submitMarker = async (markerText, date) => {

    if (editItem!='') {
      let marker = markerText.trim()
      try {
        let { data, error } = await supabase
          .from('marker')
          .update({ memo: marker, date })
          .eq('id', editItem)
          .single()
        
          setMarkers([...markers, data])
          setNewMarkerText('')
          setNewDate('')
          setEditItem('')
      } catch (error) {
        console.log('error', error)
      }
    } else {
      let marker = markerText.trim()
      if (marker.length) {
        let { data, error } = await supabase
          .from('marker')
          .insert({ memo: marker, user_id: user.id, ticker, date })
          .single()
        if (error) setError(error.message)
        else {
          setMarkers([...markers, data])
          setNewMarkerText('')
          setNewDate('')
        }
      }
    }

  }

  //  <!-- Update marker-->
  const updateMarker = async (id) => {

    setEditItem(id)

    const filteredMarkers = markers.filter(item => {
      return item.id != id
    })

    const editMarker = markers.find(item =>{
      return item.id == id
    })

    setMarkers(filteredMarkers)
    setNewMarkerText(editMarker.memo)
    setNewDate(editMarker.date)

  }


  // <!-- markerの削除 -->
  const deleteMarker = async (id) => {
    try {
      await supabase.from('marker').delete().eq('id', id)
      setMarkers(markers.filter((x) => x.id != id))
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div className="w-full">
      <h4 className="mt-10 mb-2 font-bold font-xl">Marker情報</h4>
      <div className="flex gap-2 my-2">
        <input
          className="rounded w-full p-2 border border-black"
          type="date"
          value={newDate}
          onChange={(e) => {
            setError('')
            setNewDate(e.target.value)
          }}
        />
        <input
          className="rounded w-full p-2 border border-black"
          type="text"
          placeholder="メモを入力してください"
          value={newMarkerText}
          onChange={(e) => {
            setError('')
            setNewMarkerText(e.target.value)
          }}
        />

        {editItem!='' ? (
          <button
            className="btn-black p-2"
            onClick={() => submitMarker(newMarkerText, newDate)}
          >
            Edit
          </button>
        ) : (
          <button
            className="btn-black p-2 border border-black rounded"
            onClick={() => submitMarker(newMarkerText, newDate)}
          >
            Add
          </button>
        )}
      </div>
      {!!errorText && <Alert text={errorText} />}
      <div className="bg-white shadow overflow-hidden rounded-md">
        <ul>
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              marker={marker}
              onDelete={() => deleteMarker(marker.id)}
              onUpdate={() => updateMarker(marker.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

// <!-- ☑の処理 -->
const Marker = ({ marker, onDelete,onUpdate }) => {

  return (
    <li className="w-full block border-2 border-gray-300">
      <div className="flex items-center px-4 py-2 sm:px-6">
        <div className="min-w-0 flex-1 flex items-center">
          <div className="text-sm leading-5 font-medium truncate">
            {marker.date}/{marker.memo}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onUpdate(e)
          }}
          className="p-1 ml-2 border-2 hover:border-black rounded"
        >
          E
        </button>

        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onDelete()
          }}
          className="p-1 ml-2 border-2 hover:border-black rounded"
        >X
        </button>
      </div>
    </li>
  )
}

const Alert = ({ text }) => (
  <div className="rounded-md bg-red-100 p-4 my-3">
    <div className="text-sm leading-5 text-red-700">{text}</div>
  </div>
)
