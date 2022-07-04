// <!-- 必要なものをimport -->
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

import useStore from '../store/store'
import { useMutateMarker } from '../hooks/useMutateMarker'
import { useQueryMarker } from '../hooks/useQueryMarker'

import { useContext } from 'react'
import { UserContext } from '../utils/UserContext'

import { checkAllowanceMarker } from '../functions/checkAllowanceMarker'

import * as AiIcons from 'react-icons/ai'
import { ActionIcon } from '@mantine/core';

export default function InputMarker({ ticker,t }) {
  const { editedMarker, resetEditedMarker } = useStore()
  const update = useStore((state) => state.updateEditedMarker)
  const { createMarkerMutation, updateMarkerMutation, deleteMarkerMutation } = useMutateMarker()
  const { data: markerData, status } = useQueryMarker()

  const markerList = markerData?.filter((data) => {
    return data.ticker === ticker
  })

  const { user: contextUser, session: contextSession, rank } = useContext(UserContext)

  //  <!-- marker -->
  // const [markers, setMarkers] = useState([])
  const [editItem, setEditItem] = useState('')

  const { canMarkerInput } = checkAllowanceMarker(rank, markerData)
  

  if (status === 'error') {
    return <div>Error</div>
  }

  //  <!-- markerの追加 -->
  const submitMarker = async () => {
    // e.preventDefault()
    if(editedMarker.memo === "" || editedMarker.date === "") {
      alert(`${t.inputRequiredAlert}`)
      return 
    }

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

  const deleteMarker = (marker) => {
    let confirmDelete = confirm(`${t.inputDeleteAlert}`)
    if(confirmDelete){
      deleteMarkerMutation.mutate(marker.id)
    } else {
      return
    }
  }

  const editCancel = () => {
    console.log('cancel')
    setEditItem('')
    resetEditedMarker()
  }

  return (
    <div className='w-full'>
      <h4 className='mt-10 mb-2 font-bold font-xl'>{t.inputMarkerTitle}</h4>
      <div>{canMarkerInput ? <div>{t.inputCan}</div> : <div>{t.inputCannot}</div>}</div>

      <div className='flex gap-2 my-2 flex-wrap'>
        <input
          className='rounded p-2 border border-black text-base'
          type='date'
          value={editedMarker.date}
          onChange={(e) => update({ ...editedMarker, date: e.target.value })}
          required
        />
        <input
          className='rounded w-full p-2 border border-black text-base'
          type='text'
          placeholder={t.inputPlaceHolder}
          value={editedMarker.memo}
          onChange={(e) => update({ ...editedMarker, memo: e.target.value })}
          required
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
            <li className='w-full block' key={marker.id}>
              <div className='flex items-center px-4 py-2 sm:px-6'>
                <div className='min-w-0 flex-1 flex items-center'>
                  <div className='text-sm leading-5 font-medium truncate'>
                    {marker.date}/{marker.memo}
                  </div>
                </div>

                <ActionIcon variant="hover"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    updateMarker(marker)
                  }}
                  ><AiIcons.AiFillEdit />
                </ActionIcon>
 
                <ActionIcon variant="hover"
                  onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      deleteMarker(marker)
                    }}
                    >
                  <AiIcons.AiFillDelete />
                </ActionIcon>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
