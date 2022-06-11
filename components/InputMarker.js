// <!-- 必要なものをimport -->
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'
import Link from 'next/link'

export default function InputMarker({ user, ticker, canMarkerInput }) {
  //  <!-- marker -->
  const [markers, setMarkers] = useState([])
  const [markersTotal, setMarkersTotal] = useState(0)
  //  <!-- 入力したmarker -->
  const [newMarkerText, setNewMarkerText] = useState('')
  const [newDate, setNewDate] = useState('')
  const [editItem, setEditItem] = useState('')
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
      // .eq('ticker', ticker)
      .order('id', true)
    if (error) console.log('error', error)
    else {
      if (markers.length) {
        setMarkersTotal(markers.length)
        const currentTickerMarker = markers.filter((item) => {
          return item.ticker.toLowerCase() === ticker.toLowerCase()
        })
        if (currentTickerMarker.length > 0) {
          setMarkers(currentTickerMarker)
        }
      }
    }
  }

  //  <!-- markerの追加 -->
  const submitMarker = async (markerText, date) => {
    if (editItem != '') {
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

    const filteredMarkers = markers.filter((item) => {
      return item.id != id
    })

    const editMarker = markers.find((item) => {
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
    <div className='w-full'>
      <h4 className='font-xl mt-10 mb-2 font-bold'>Marker情報</h4>
      {canMarkerInput ? null : (
        <div>
          <span>入力数が無料枠上限に達しています</span>
          <Link href='/member'>
            <a>メンバーページへ</a>
          </Link>
        </div>
      )}
      <div className='my-2 flex flex-wrap gap-2'>
        <input
          className='rounded border border-black p-2 text-base'
          type='date'
          value={newDate}
          onChange={(e) => {
            setError('')
            setNewDate(e.target.value)
          }}
        />
        <input
          className='w-full rounded border border-black p-2 text-base'
          type='text'
          placeholder='メモを入力してください'
          value={newMarkerText}
          onChange={(e) => {
            setError('')
            setNewMarkerText(e.target.value)
          }}
        />

        {editItem != '' ? (
          <button className='btn-black p-2' onClick={() => submitMarker(newMarkerText, newDate)}>
            Edit
          </button>
        ) : (
          <button
            className='btn-black rounded border border-black p-2'
            onClick={() => submitMarker(newMarkerText, newDate)}
            disabled={!canMarkerInput}
          >
            Add
          </button>
        )}
      </div>
      {!!errorText && <Alert text={errorText} />}
      <div className='overflow-hidden rounded-md bg-white shadow'>
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
const Marker = ({ marker, onDelete, onUpdate }) => {
  return (
    <li className='block w-full border-2 border-gray-300'>
      <div className='flex items-center px-4 py-2 sm:px-6'>
        <div className='flex min-w-0 flex-1 items-center'>
          <div className='truncate text-sm font-medium leading-5'>
            {marker.date}/{marker.memo}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onUpdate(e)
          }}
          className='ml-2 rounded border-2 p-1 hover:border-black'
        >
          E
        </button>

        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onDelete()
          }}
          className='ml-2 rounded border-2 p-1 hover:border-black'
        >
          X
        </button>
      </div>
    </li>
  )
}

const Alert = ({ text }) => (
  <div className='my-3 rounded-md bg-red-100 p-4'>
    <div className='text-sm leading-5 text-red-700'>{text}</div>
  </div>
)
