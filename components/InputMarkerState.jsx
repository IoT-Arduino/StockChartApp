import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../utils/supabase'
import { useContext } from 'react'
import { UserContext } from '../utils/UserContext'
import useStore from '../store/store'
import { useMutateMarker } from '../hooks/useMutateMarker'
import { useQueryMarker } from '../hooks/useQueryMarker'
import { checkAllowanceMarker } from '../functions/checkAllowanceMarker'


// Mantine
import { ActionIcon } from '@mantine/core';
// import { DatePicker } from '@mantine/dates'
import { TextInput, Button } from '@mantine/core'
import { DateInput } from 'mantine-dates-6'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'

import * as AiIcons from 'react-icons/ai'

export default function InputMarker({ ticker,t }) {
  const { user: contextUser, session: contextSession, rank } = useContext(UserContext)
  const { editedMarker, resetEditedMarker } = useStore()
  const update = useStore((state) => state.updateEditedMarker)
  const { createMarkerMutation, updateMarkerMutation, deleteMarkerMutation } = useMutateMarker()
  const { data: markerData, status } = useQueryMarker()

  const router = useRouter()
  const { locale } = router

  const markerList = markerData?.filter((data) => {
    return data.ticker === ticker
  })

  //  <!-- marker -->
  const [editItem, setEditItem] = useState('')
  const { canMarkerInput } = checkAllowanceMarker(rank, markerData)
  
  if (status === 'error') {
    return <div>Error</div>
  }

  // <!-- 日付関連処理 -->
  let formattedDate = ''
  if (editedMarker.date !== '') {
    formattedDate = dayjs(editedMarker.date).toDate()
  }

  const dateUpdate = (e) => {
    if (e) {
      const ymd = `${e.getFullYear()}-${e.getMonth() + 1}-${e.getDate()} `
      update({ ...editedMarker, date: ymd })
    }
  }


  //  <!-- markerの追加 -->
  const submitMarker = async () => {
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
    setEditItem('')
    resetEditedMarker()
  }

  return (
    <div className='w-full'>
      <h4 className='font-xl mt-10 mb-2 font-bold'>{t.inputMarkerTitle}</h4>
      <div data-testid='inputMarkerStatus'>{canMarkerInput ? '' : <div>{t.inputCannot}</div>}</div>

      <div className='my-2 flex flex-wrap justify-start gap-2'>
        {locale === 'ja-JP' ? (
          <DateInput
            locale='ja'
            placeholder='クリックして日付を入力してください'
            // inputFormat='YYYY-MM-DD'
            value={formattedDate}
            onChange={(e) => dateUpdate(e)}
            defaultValue={formattedDate}
            required
            data-testid='markerDateInput'
          />
        ) : (
          <DateInput
            placeholder='Pick date'
            // inputFormat='MM-DD-YYYY'
            value={formattedDate}
            onChange={(e) => dateUpdate(e)}
            defaultValue={formattedDate}
            required
            data-testid='markerDateInput'
          />
        )}

        {/* <input
          className='rounded p-2 border border-black text-base'
          type='date'
          value={editedMarker.date}
          onChange={(e) => update({ ...editedMarker, date: e.target.value })}
          required
          data-testid="markerDateInput"
        /> */}

        <div className='grow'>
          <TextInput
            placeholder={t.inputPlaceHolder}
            value={editedMarker.memo}
            onChange={(e) => update({ ...editedMarker, memo: e.target.value })}
            required
            data-testid='markerMemoInput'
          />
        </div>

        {/* <input
          className='w-full rounded border border-black p-2 text-base'
          type='text'
          placeholder={t.inputPlaceHolder}
          value={editedMarker.memo}
          onChange={(e) => update({ ...editedMarker, memo: e.target.value })}
          required
          data-testid='markerMemoInput'
        /> */}

        {editItem != '' ? (
          <div>
            <Button variant='outline' color='teal' onClick={() => submitMarker()}>
              {t.inputSave}
            </Button>{' '}
            <Button variant='outline' color='teal' onClick={() => editCancel()}>
              {t.inputCancel}
            </Button>
          </div>
        ) : (
          <div>
            <Button
              variant='outline'
              color='teal'
              // className='btn-black rounded border border-black p-2'
              onClick={() => submitMarker()}
              disabled={!canMarkerInput}
              data-testid='addMarker'
            >
              {t.inputSave}
            </Button>{' '}
            <Button
              // className='btn-black rounded border border-black p-2'
              variant='outline'
              color='teal'
              onClick={() => resetEditedMarker()}
              disabled={!canMarkerInput}
              data-testid='addMarker'
            >
              {t.inputCancel}
            </Button>
          </div>
        )}
      </div>

      <div className='overflow-hidden rounded-md bg-white shadow'>
        <ul className='px-2'>
          {markerList?.map((marker) => (
            <li className='block w-full border-2 border-gray-300' key={marker.id}>
              <div className='flex flex-wrap items-center py-2'>
                <div className='flex min-w-0 flex-1 items-center'>
                  <div className='truncate text-sm font-medium leading-5'>
                    <span className='mr-2'>{marker.date}</span>
                    <span>{marker.memo}</span>
                  </div>
                </div>

                <ActionIcon
                  // variant='hover'
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    updateMarker(marker)
                  }}
                  className='ml-1 p-1'
                >
                  <AiIcons.AiFillEdit />
                </ActionIcon>

                <ActionIcon
                  // variant='hover'
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    deleteMarker(marker)
                  }}
                  data-testid='markerDelete'
                  className='ml-1 p-1'
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
