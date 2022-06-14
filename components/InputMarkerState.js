// <!-- 必要なものをimport -->
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

import useStore from '../store/store'
import { useMutateMarker } from '../hooks/useMutateMarker'
import { useQueryMarker } from '../hooks/useQueryMarker'

import { useContext } from 'react'
import { UserContext } from '../utils/UserContext'

import { checkAllowanceMarker } from '../functions/checkAllowanceMarker'

export default function InputMarker({ ticker }) {
  const { editedMarker, resetEditedMarker } = useStore()
  const update = useStore((state) => state.updateEditedMarker)
  const { createMarkerMutation, updateMarkerMutation, deleteMarkerMutation } = useMutateMarker()
  const { data: markerData, status } = useQueryMarker()

  const markerList = markerData?.filter((data) => {
    return data.ticker === ticker
  })

  const { user: contextUser, session: contextSession, rank } = useContext(UserContext)

  //  <!-- marker -->
  const [markers, setMarkers] = useState([])
  const [editItem, setEditItem] = useState('')

  const { canMarkerInput } = checkAllowanceMarker(rank, markerData)
  

  if (status === 'error') {
    return <div>Error</div>
  }

  //  <!-- markerの追加 -->
  const submitMarker = async () => {
    // e.preventDefault()

    if (editItem != '') {
      try {
        updateMarkerMutation.mutate({
          id: editedMarker.id,
          memo: editedMarker.memo,
          date: editedMarker.date,
        })

        setEditItem('')
      } catch (error) {
        console.log('error', error)
      }
    } else {
      createMarkerMutation.mutate({
        memo: editedMarker.memo,
        date: editedMarker.date,
        ticker: ticker,
        user_id: supabase.auth.user()?.id, // 重要！！
      })
    }
  }

  //  <!-- Update marker-->
  const updateMarker = async (marker) => {
    setEditItem(marker.id)
    update({
      id: marker.id,
      ticker: ticker,
      date: marker.date,
      memo: marker.memo,
    })
  }

  const editCancel = () => {
    console.log('cancel')
    setEditItem('')
    resetEditedMarker()
  }

  return (
    <div className='w-full'>
      <h4 className='mt-10 mb-2 font-bold font-xl'>Marker情報:{markerList?.length}</h4>
      <div>{canMarkerInput ? <div>入力可</div> : <div>入力不可</div>}</div>

      <div className='flex gap-2 my-2 flex-wrap'>
        <input
          className='rounded p-2 border border-black text-base'
          type='date'
          value={editedMarker.date}
          onChange={(e) => update({ ...editedMarker, date: e.target.value })}
        />
        <input
          className='rounded w-full p-2 border border-black text-base'
          type='text'
          placeholder='メモを入力してください'
          value={editedMarker.memo}
          onChange={(e) => update({ ...editedMarker, memo: e.target.value })}
        />

        {editItem != '' ? (
          <div>
            <button className='btn-black' onClick={() => submitMarker()}>
              Edit
            </button>
            <button className='btn-black' onClick={() => editCancel()}>
              EditCancel
            </button>
          </div>
        ) : (
          <button
            className='btn-black p-2 border border-black rounded'
            onClick={() => submitMarker()}
            disabled={!canMarkerInput}
          >
            Add
          </button>
        )}
      </div>

      <div className='bg-white shadow overflow-hidden rounded-md'>
        <ul>
          {markerList?.map((marker) => (
            <li className='w-full block border-2 border-gray-300' key={marker.id}>
              <div className='flex items-center px-4 py-2 sm:px-6'>
                <div className='min-w-0 flex-1 flex items-center'>
                  <div className='text-sm leading-5 font-medium truncate'>
                    {marker.date}/{marker.memo}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    updateMarker(marker)
                  }}
                  className='p-1 ml-2 border-2 hover:border-black rounded'
                >
                  E
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    deleteMarkerMutation.mutate(marker.id)
                  }}
                  className='p-1 ml-2 border-2 hover:border-black rounded'
                >
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
