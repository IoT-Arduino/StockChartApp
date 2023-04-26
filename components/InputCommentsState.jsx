import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../utils/supabase'
import { useContext } from 'react'
import { UserContext } from '../utils/UserContext'
import useStore from '../store/store'
import { useMutateComment } from '../hooks/useMutateComment'
import { useQueryComments } from '../hooks/useQueryComments'
import { checkAllowanceComment } from '../functions/checkAllowanceComment'

// Mantine
import { ActionIcon } from '@mantine/core'
import { TextInput, Button } from '@mantine/core'

// DatePicker related
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ja from 'date-fns/locale/ja'
import enUS from 'date-fns/locale/en-US'
import { CustomCalendarHeader } from '../functions/CustomCalendarHeader'

// Icons
import * as AiIcons from 'react-icons/ai'
import { GiCancel } from 'react-icons/gi'

export default function InputComments({ ticker, t }) {
  const { user: contextUser, session: contextSession, rank } = useContext(UserContext)
  const { editedComment, resetEditedComment } = useStore()
  const update = useStore((state) => state.updateEditedComment)
  const { createCommentMutation, updateCommentMutation, deleteCommentMutation } = useMutateComment()
  const { data: commentData, status } = useQueryComments()

  const router = useRouter()
  const { locale } = router
  registerLocale('ja', ja)
  registerLocale('en', enUS)

  const commentList = commentData?.filter((data) => {
    return data.ticker === ticker
  })

  const [editItem, setEditItem] = useState(null)
  const [editStatus, setEditStatus] = useState(false)
  const { canCommentInput } = checkAllowanceComment(rank, commentData)

  // Edit only related state
  const [inputComment, setInputComment] = useState({
    ticker: ticker,
    date: null,
    memo: '',
    id: supabase.auth.user()?.id,
  })

  if (status === 'error') {
    return <div>Error</div>
  }

  //  Common functions
  const switchDateFormatInList = (dateString) => {
    const date = new Date(dateString)
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }

    if (locale === 'ja-JP') {
      return date.toLocaleDateString('ja-JP', options)
    } else {
      return date.toLocaleDateString('en-US', options)
    }
  }

  // Add  comment related only functions
  const submitInputComment = () => {
    if (inputComment.memo === '' || inputComment.date === '') {
      alert(`${t.inputRequiredAlert}`)
      return
    }
    createCommentMutation.mutate({
      memo: inputComment.memo,
      date: inputComment.date,
      ticker: inputComment.ticker,
      user_id: inputComment.id, // 重要！！
    })
    setInputComment({
      ...inputComment,
      date: '',
      memo: '',
    })
  }

  //  <!-- edit comment related only functions-->
  const submitEditComment = async () => {
    if (editedComment.memo === '' || editedComment.date === '') {
      alert(`${t.inputRequiredAlert}`)
      return
    }

    try {
      updateCommentMutation.mutate({
        id: editedComment.id,
        memo: editedComment.memo,
        date: editedComment.date,
      })
      setEditItem('')
      setEditStatus(false)
    } catch (error) {
      console.log('error', error)
    }
  }

  const editComment = async (comment) => {
    setEditStatus(true)
    setEditItem(comment.id)
    update({
      id: comment.id,
      ticker: ticker,
      date: comment.date,
      memo: comment.memo,
    })
  }

  const deleteComment = (comment) => {
    let confirmDelete = confirm(`${comment.date} : ${comment.memo} : ${t.inputDeleteAlert}`)
    if (confirmDelete) {
      deleteCommentMutation.mutate(comment.id)
    } else {
      return
    }
  }

  const editCancel = () => {
    setEditItem('')
    resetEditedComment()
    setInputComment({ ticker, id: supabase.auth.user()?.id, date: '', memo: '' })
    setEditStatus(false)
  }

  return (
    <div className='w-full'>
      <h4 className='font-xl mb-2 mt-10 font-bold'>{t.inputCommentTitle}</h4>
      <div data-testid='inputCommentStatus'>
        {canCommentInput ? '' : <div>{t.inputCannot}</div>}
      </div>

      {/* Add Comment Input Fields  */}
      <div className='my-2 flex flex-wrap justify-start gap-2'>
        <div>
          {locale === 'ja-JP' ? (
            <DatePicker
              className={`rounded border-gray-100 p-1.5 text-base outline-0`}
              wrapperClassName='react-datepicker__input-container'
              placeholderText={'日付を選択'}
              type='date'
              selected={inputComment.date}
              onChange={(date) => setInputComment({ ...inputComment, date: date })}
              required
              data-testid='commentDateInput'
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode='select'
              disabled={editStatus}
              locale='ja'
              dateFormat='yyyy/MM/dd'
              renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <CustomCalendarHeader
                  date={date}
                  changeYear={changeYear}
                  changeMonth={changeMonth}
                  decreaseMonth={decreaseMonth}
                  increaseMonth={increaseMonth}
                  prevMonthButtonDisabled={prevMonthButtonDisabled}
                  nextMonthButtonDisabled={nextMonthButtonDisabled}
                />
              )}
            />
          ) : (
            <DatePicker
              className={`rounded border-gray-100 p-1.5 text-base outline-0`}
              placeholderText={'Please select date'}
              type='date'
              selected={inputComment.date}
              onChange={(date) => setInputComment({ ...inputComment, date: date })}
              required
              data-testid='commentDateInput'
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode='select'
              disabled={editStatus}
              locale='en'
              dateFormat='MM/dd/yyyy'
            />
          )}
        </div>

        <TextInput
          className='grow text-base'
          type='text'
          placeholder={t.inputPlaceHolder}
          value={inputComment.memo}
          onChange={(e) => setInputComment({ ...inputComment, memo: e.target.value })}
          required
          data-testid='commentMemoInput'
        />

        <div>
          <Button
            variant='outline'
            color='teal'
            onClick={() => submitInputComment()}
            disabled={!canCommentInput || editStatus}
            data-testid='addComment'
            className='mr-2'
          >
            {t.inputSave}
          </Button>
          <Button
            variant='outline'
            color='teal'
            onClick={() => setInputComment({ ...inputComment, date: '', memo: '' })}
            disabled={!canCommentInput || editStatus}
            data-testid='resetComment'
          >
            {t.inputCancel}
          </Button>
        </div>
      </div>

      {/* Edit Comment Input Fields  */}
      <div className='mb-8 overflow-hidden rounded-md bg-white shadow'>
        <ul className='px-2'>
          {commentList?.map((comment) => (
            <li className='block w-full border-2 border-gray-300' key={comment.id}>
              <div className=''>
                {editItem === comment.id ? (
                  <div className='flex flex-wrap items-center py-2'>
                    <div>
                      {locale === 'ja-JP' ? (
                        <DatePicker
                          className='rounded border-gray-100 p-1.5 text-base outline-0'
                          selected={new Date(editedComment.date)}
                          type='date'
                          onChange={(date) => update({ ...editedComment, date: date })}
                          required
                          data-testid='commentDateInput'
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode='select'
                          locale='ja'
                          dateFormat='yyyy/MM/dd'
                          renderCustomHeader={({
                            date,
                            changeYear,
                            changeMonth,
                            decreaseMonth,
                            increaseMonth,
                            prevMonthButtonDisabled,
                            nextMonthButtonDisabled,
                          }) => (
                            <CustomCalendarHeader
                              date={date}
                              changeYear={changeYear}
                              changeMonth={changeMonth}
                              decreaseMonth={decreaseMonth}
                              increaseMonth={increaseMonth}
                              prevMonthButtonDisabled={prevMonthButtonDisabled}
                              nextMonthButtonDisabled={nextMonthButtonDisabled}
                            />
                          )}
                        />
                      ) : (
                        <DatePicker
                          className='rounded border-gray-100 p-1.5 text-base outline-0'
                          selected={new Date(editedComment.date)}
                          type='date'
                          onChange={(date) => update({ ...editedComment, date: date })}
                          required
                          data-testid='commentDateInput'
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode='select'
                          locale='en'
                          dateFormat='MM/dd/yyyy'
                        />
                      )}
                    </div>
                    <TextInput
                      className='flex-grow rounded border border-black p-2 text-base outline-0'
                      type='text'
                      placeholder={t.inputPlaceHolder}
                      value={editedComment.memo}
                      onChange={(e) => update({ ...editedComment, memo: e.target.value })}
                      required
                      data-testid='commentMemoInput'
                    />

                    <ActionIcon
                      onClick={() => submitEditComment()}
                      data-testid='updateComment'
                      className='ml-1 p-1'
                    >
                      <AiIcons.AiOutlineSave />
                    </ActionIcon>
                    <ActionIcon
                      onClick={() => editCancel()}
                      data-testid='cancelComment'
                      className='ml-1 p-1'
                    >
                      <GiCancel />
                    </ActionIcon>
                  </div>
                ) : (
                  <div className='mb-3 flex items-center justify-between px-2'>
                    <div className='truncate text-sm font-medium leading-5'>
                      <span className='mr-6'>{switchDateFormatInList(comment.date)}</span>
                      <span className='flex-grow'>{comment.memo}</span>
                    </div>
                    <div className='flex'>
                      <ActionIcon
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          editComment(comment)
                        }}
                        className='ml-1 p-1'
                      >
                        <AiIcons.AiFillEdit />
                      </ActionIcon>
                      <ActionIcon
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          deleteComment(comment)
                        }}
                        data-testid='commentDelete'
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
