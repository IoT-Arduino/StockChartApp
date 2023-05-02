import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../utils/supabase'
import { useContext } from 'react'
import { UserContext } from '../utils/UserContext'
import { useMutateMarker } from '../hooks/useMutateMarker'
import { useQueryMarker } from '../hooks/useQueryMarker'
import { checkAllowanceMarker } from '../functions/checkAllowanceMarker'

// Redux Related
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/rootReducer'
import { updateEditedMarker, resetEditedMarker } from '../store/editInfoSlice'

// Mantine
import { ActionIcon } from '@mantine/core';
import { TextInput, Button } from '@mantine/core'

// DatePicker related
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ja from 'date-fns/locale/ja'
import enUS from 'date-fns/locale/en-US'
import { subYears } from 'date-fns'

// Icons
import * as AiIcons from 'react-icons/ai'
import { GiCancel } from 'react-icons/gi'

// Types
import { TranslationLocales } from '../types/TranslationLocales'
import { Marker } from '../types/StoreTypes'

export default function InputMarker({ ticker, t }: { ticker: string; t: TranslationLocales }) {
  const { user: contextUser, session: contextSession, rank } = useContext(UserContext)
   const { createMarkerMutation, updateMarkerMutation, deleteMarkerMutation } = useMutateMarker()
  const { data: markerData, status } = useQueryMarker()

  const router = useRouter()
  const { locale } = router
  registerLocale('ja', ja)
  registerLocale('en', enUS)

  // Redux Related
  const editedMarker = useSelector((state: RootState) => state.editInfo.editedMarker)
  const dispatch = useDispatch()

  const [editItem, setEditItem] = useState<string | null>(null)
  const [editStatus, setEditStatus] = useState<boolean>(false)
  const { canMarkerInput } = checkAllowanceMarker(rank, markerData)

  // Add only related state
  const [inputMarker, setInputMarker] = useState({
    ticker: ticker,
    date: null as string | null,
    memo: '',
    id: supabase.auth.user()?.id,
  })

  // Filter and  Sort Marker - Decending
  const markerList = markerData?.filter((data) => {
    return data.ticker === ticker
  })

  const sortedMarkerList = markerList?.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB.getTime() - dateA.getTime()
  })

  //  Common functions
  const switchDateFormatInList = (dateString: string) => {
    const date = new Date(dateString)
    const options = {
      year: 'numeric' as const,
      month: '2-digit' as const,
    }

    if (locale === 'ja-JP') {
      return date.toLocaleDateString('ja-JP', options)
    } else {
      return date.toLocaleDateString('en-US', options)
    }
  }

  // Add marker related function
  const submitInputMarker = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputMarker.memo === '' || inputMarker.date === '') {
      alert(`${t.inputRequiredAlert}`)
      return
    }
    createMarkerMutation.mutate({
      memo: inputMarker.memo!,
      date: inputMarker.date!,
      ticker: inputMarker.ticker!,
      user_id: inputMarker.id, // 重要！！
    })
    setInputMarker({
      ...inputMarker,
      date: '',
      memo: '',
    })
  }

  const inputYearMonth = (date: Date) => {
    if (date) {
      const selectedYear = date.getFullYear()
      const selectedMonth = date.getMonth()
      const newDate = new Date(selectedYear, selectedMonth, 15)
      setInputMarker({
        ...inputMarker,
        date: newDate.toISOString().substring(0, 10),
      })
    } else {
      setInputMarker({
        ...inputMarker,
        date: null,
      })
    }
  }

  //  Edit marker related function
  const submitEditMarker = async () => {
    if (editedMarker.memo === '' || editedMarker.date === '') {
      alert(`${t.inputRequiredAlert}`)
      return
    }

    try {
      updateMarkerMutation.mutate({
        id: editedMarker.id,
        memo: editedMarker.memo,
        date: editedMarker.date,
        ticker,
      })
      setEditItem(null)
      setEditStatus(false)
    } catch (error) {
      console.log('error', error)
    }
  }

  const editMarker = async (marker: Partial<Marker>) => {
    setEditStatus(true)
    setEditItem(marker.id!)
    dispatch(
      updateEditedMarker({
        id: marker.id!,
        ticker: ticker,
        date: marker.date!,
        memo: marker.memo!,
      })
    )
  }

  const deleteMarker = (marker: Partial<Marker>) => {
    let confirmDelete = confirm(`${marker.date} : ${marker.memo}: ${t.inputDeleteAlert}`)
    if (confirmDelete) {
      deleteMarkerMutation.mutate(marker.id!)
    } else {
      return
    }
  }

  const editCancel = () => {
    setEditItem(null)
    resetEditedMarker()
    setInputMarker({ ticker, id: supabase.auth.user()?.id, date: '', memo: '' })
    setEditStatus(false)
  }

  const updateYearMonth = (date: Date) => {
    const selectedYear = date.getFullYear()
    const selectedMonth = date.getMonth()
    const newDate = new Date(selectedYear, selectedMonth, 15)
    dispatch(updateEditedMarker({ ...editedMarker, date: date ? date.toISOString().substring(0, 10) : '' }));
  }

  if (status === 'error') {
    return <div>Error</div>
  }

  return (
    <div className='w-full'>
      <h4 className='font-xl mb-2 mt-10 font-bold'>{t.inputMarkerTitle}</h4>
      <div data-testid='inputMarkerStatus'>{canMarkerInput ? '' : <div>{t.inputCannot}</div>}</div>

      {/* Add Marker Input Fields  */}
      <form className='my-2 flex flex-wrap justify-start gap-2' onSubmit={submitInputMarker} data-testid="inputMarkerForm">
        <div>
          {locale === 'ja-JP' ? (
            <DatePicker
              className={`rounded border-gray-100 p-1.5 text-base outline-0`}
              wrapperClassName='react-datepicker__input-container'
              placeholderText={'日付を選択'}
              selected={inputMarker.date ? new Date(inputMarker.date) : null}
              onChange={inputYearMonth}
              required
              data-testid='markerDateInput'
              dropdownMode='select'
              disabled={editStatus}
              locale='ja'
              dateFormat='yyyy/MM'
              minDate={subYears(new Date(), 10)}
              showMonthYearPicker
            />
          ) : (
            <DatePicker
              className={`rounded border-gray-100 p-1.5 text-base outline-0`}
              placeholderText={'Please select date'}
              selected={inputMarker.date ? new Date(inputMarker.date) : null}
              onChange={inputYearMonth}
              required
              data-testid='markerDateInput'
              dropdownMode='select'
              disabled={editStatus}
              locale='en'
              dateFormat='MM/yyyy'
              minDate={subYears(new Date(), 10)}
              showMonthYearPicker
            />
          )}
        </div>

        <TextInput
          className='grow text-base'
          type='text'
          placeholder={t.inputPlaceHolder}
          value={inputMarker.memo}
          onChange={(e) => setInputMarker({ ...inputMarker, memo: e.target.value })}
          required
          data-testid='markerMemoInput'
        />

        <div>
          <Button
            variant='outline'
            color='teal'
            disabled={!canMarkerInput || editStatus}
            data-testid='addMarker'
            className='mr-2'
            type="submit"
          >
            {t.inputSave}
          </Button>
          <Button
            variant='outline'
            color='teal'
            onClick={() => setInputMarker({ ...inputMarker, date: '', memo: '' })}
            disabled={!canMarkerInput || editStatus}
            data-testid='resetMarker'
          >
            {t.inputCancel}
          </Button>
        </div>
      </form>

      {/* Edit Marker Input Fields  */}
      <div className='mb-8 overflow-hidden rounded-md bg-white shadow'>
        <ul className='px-2'>
          {sortedMarkerList?.map((marker) => (
            <li className='block w-full border-2 border-gray-300' key={marker.id}>
              <div className=''>
                {editItem === marker.id ? (
                  <div className='flex flex-wrap items-center py-2'>
                    <div>
                      {locale === 'ja-JP' ? (
                        <DatePicker
                          className='rounded border-gray-100 p-1.5 text-base outline-0'
                          selected={new Date(editedMarker.date)}
                          onChange={updateYearMonth}
                          required
                          data-testid='markerDateInput'
                          dropdownMode='select'
                          locale='ja'
                          dateFormat='yyyy/MM'
                          minDate={subYears(new Date(), 10)}
                          showMonthYearPicker
                        />
                      ) : (
                        <DatePicker
                          className='rounded border-gray-100 p-1.5 text-base outline-0'
                          selected={new Date(editedMarker.date)}
                          onChange={updateYearMonth}
                          required
                          data-testid='markerDateInput'
                          dropdownMode='select'
                          locale='en'
                          dateFormat='MM/yyyy'
                          minDate={subYears(new Date(), 10)}
                          showMonthYearPicker
                        />
                      )}
                    </div>
                    <TextInput
                      className='flex-grow rounded border border-black p-2 text-base outline-0'
                      type='text'
                      placeholder={t.inputPlaceHolder}
                      value={editedMarker.memo}
                      onChange={(e) =>
                        dispatch(updateEditedMarker({ ...editedMarker, memo: e.target.value }))
                      }
                      required
                      data-testid='markerMemoInput'
                    />

                    <ActionIcon
                      onClick={() => submitEditMarker()}
                      data-testid='updateMarker'
                      className='ml-1 p-1'
                    >
                      <AiIcons.AiOutlineSave />
                    </ActionIcon>
                    <ActionIcon
                      onClick={() => editCancel()}
                      data-testid='cancelMarker'
                      className='ml-1 p-1'
                    >
                      <GiCancel />
                    </ActionIcon>
                  </div>
                ) : (
                  <div className='mb-3 flex items-center justify-between px-2'>
                    <div className='truncate text-sm font-medium leading-5'>
                      <span className='mr-6'>{switchDateFormatInList(marker.date)}</span>
                      <span className='flex-grow'>{marker.memo}</span>
                    </div>
                    <div className='flex'>
                      <ActionIcon
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          editMarker(marker)
                        }}
                        className='ml-1 p-1'
                      >
                        <AiIcons.AiFillEdit />
                      </ActionIcon>
                      <ActionIcon
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
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
