import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../utils/supabase'
import { useContext } from 'react'
import { UserContext } from '../utils/UserContext'
import { useMutateComment } from '../hooks/useMutateComment'
import { useQueryComments } from '../hooks/useQueryComments'
import { checkAllowanceComment } from '../functions/checkAllowanceComment'

// Redux Related
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/rootReducer'
import { updateEditedComment, resetEditedComment } from '../store/editInfoSlice'

// Mantine
import { ActionIcon } from '@mantine/core'
import { TextInput, Button } from '@mantine/core'

// DatePicker related
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ja from 'date-fns/locale/ja'
import enUS from 'date-fns/locale/en-US'
import { CustomCalendarHeader } from '../functions/CustomCalendarHeader'
import { subYears } from 'date-fns'

// Icons
import * as AiIcons from 'react-icons/ai'
import { GiCancel } from 'react-icons/gi'

// Types
import { TranslationLocales } from '../types/TranslationLocales'
import { Comment } from '../types/StoreTypes'

export default function InputComments({ ticker, t }: { ticker: string; t: TranslationLocales }) {
  const { user: contextUser, session: contextSession, rank } = useContext(UserContext)
  const { createCommentMutation, updateCommentMutation, deleteCommentMutation } = useMutateComment()
  const { data: commentData, status } = useQueryComments()

  const router = useRouter()
  const { locale } = router
  registerLocale('ja', ja)
  registerLocale('en', enUS)

  // Redux Related
  const editedComment = useSelector((state: RootState) => state.editInfo.editedComment)
  const dispatch = useDispatch()

  // Local State
  const [editItem, setEditItem] = useState<string | null>(null)
  const [editStatus, setEditStatus] = useState<boolean>(false)
  const { canCommentInput } = checkAllowanceComment(rank, commentData)

  // Add only related state
  const [inputComment, setInputComment] = useState({
    ticker: ticker,
    date: null as string | null,
    memo: '',
    id: supabase.auth.user()?.id,
  })

  // Filter and  Sort Comments - Decending
  const commentList = commentData?.filter((data) => {
    return data.ticker === ticker
  })

  const sortedCommentsList = commentList?.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB.getTime() - dateA.getTime()
  })

  //  Common functions
  const handleDateChange = (date:Date|null,editStatus:"add"|"edit") =>{
      if(editStatus === "add"){
      if (date) {
        const dateInLocalTimezone = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
        setInputComment({
          ...inputComment,
          date: dateInLocalTimezone.toISOString().substring(0, 10),
        });
      } else {
        setInputComment({
          ...inputComment,
          date: null,
        });
      }
    // Edit comment date
    } else {
      if (date) {
        const dateInLocalTimezone = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
        dispatch(updateEditedComment({
            ...editedComment,
            date: date ? dateInLocalTimezone.toISOString().substring(0, 10) : '',
          })
        )
      } 
    }
  }


  const switchDateFormatInList = (dateString: string) => {
    const localDate = new Date(dateString)
    const offset = localDate.getTimezoneOffset() // ブラウザのローカルタイムとUTCとの差を分単位で取得
    const utcTimestamp = Date.parse(dateString) // UTCのタイムスタンプを取得

    // ブラウザのローカルタイムを計算して、フォーマットを整える
    const localTimestamp = utcTimestamp - (offset * 60 * 1000)
    const localDateObj = new Date(localTimestamp)

    const year = localDateObj.getFullYear()
    const month = ('00' + (localDateObj.getMonth() + 1)).slice(-2)
    const day = ('00' + localDateObj.getDate()).slice(-2)

    if (locale === 'ja-JP') {
      return `${year}/${month}/${day}`
    } else {
      return `${month}/${day}/${year}`
    }
  }

  // Add  comment related only function
  const submitInputComment = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputComment.memo === '' || inputComment.date === '') {
      alert(`${t.inputRequiredAlert}`)
      return
    }
    createCommentMutation.mutate({
      memo: inputComment.memo!,
      date: inputComment.date!,
      ticker: inputComment.ticker!,
      user_id: inputComment.id, // 重要！！
    })
    setInputComment({
      ...inputComment,
      date: '',
      memo: '',
    })
  }

  //  Edit comment related only functions
  const submitEditComment = async () => {
    if (editedComment.memo === '' || editedComment.date === '') {
      alert(`${t.inputRequiredAlert}`)
      return
    }

    try {
      updateCommentMutation.mutate({
        id: editedComment.id!,
        memo: editedComment.memo!,
        date: editedComment.date!,
        ticker,
      })
      setEditItem(null)
      setEditStatus(false)
    } catch (error) {
      console.log('error', error)
    }
  }

  const editComment = async (comment: Partial<Comment>) => {
    setEditStatus(true)
    setEditItem(comment.id!)
    dispatch(
      updateEditedComment({
        id: comment.id!,
        ticker: ticker,
        date: comment.date!,
        memo: comment.memo!,
      })
    )
  }

  const deleteComment = (comment: Partial<Comment>) => {
    let confirmDelete = confirm(`${comment.date} : ${comment.memo} : ${t.inputDeleteAlert}`)
    if (confirmDelete) {
      deleteCommentMutation.mutate(comment.id!)
    } else {
      return
    }
  }

  const editCancel = () => {
    setEditItem(null)
    resetEditedComment()
    setInputComment({ ticker, id: supabase.auth.user()?.id, date: '', memo: '' })
    setEditStatus(false)
  }

  if (status === 'error') {
    return <div>Error</div>
  }

  return (
    <div className='w-full'>
      <h4 className='font-xl mb-2 mt-10 font-bold'>{t.inputCommentTitle}</h4>
      <div data-testid='inputCommentStatus'>
        {canCommentInput ? '' : <div>{t.inputCannot}</div>}
      </div>

      {/* Add Comment Input Fields  */}
      <form
        className='my-2 flex flex-wrap justify-start gap-2'
        onSubmit={submitInputComment}
        data-testid='inputCommentForm'
      >
        <div>
          {locale === 'ja-JP' ? (
            <DatePicker
              className={`rounded border-gray-100 p-1.5 text-base outline-0`}
              wrapperClassName='react-datepicker__input-container'
              placeholderText={'日付を選択'}
              selected={inputComment.date ? new Date(inputComment.date) : null}
              onChange={(date) => handleDateChange(date,"add")}
              required
              data-testid='commentDateInput'
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
                  locale='ja-JP'
                />
              )}
            />
          ) : (
            <DatePicker
              className={`rounded border-gray-100 p-1.5 text-base outline-0`}
              placeholderText={'Please select date'}
              selected={inputComment.date ? new Date(inputComment.date) : null}
              onChange={(date) => handleDateChange(date,"add")}
              required
              data-testid='commentDateInput'
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode='select'
              disabled={editStatus}
              locale='en'
              dateFormat='MM/dd/yyyy'
              minDate={subYears(new Date(), 10)}
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
            disabled={!canCommentInput || editStatus}
            data-testid='addComment'
            className='mr-2'
            type='submit'
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
      </form>

      {/* Edit Comment Input Fields  */}
      <div className='mb-8 overflow-hidden rounded-md bg-white shadow'>
        <ul className='px-2'>
          {sortedCommentsList?.map((comment) => (
            <li className='block w-full border-2 border-gray-300' key={comment.id}>
              <div className=''>
                {editItem === comment.id ? (
                  <div className='flex flex-wrap items-center py-2'>
                    <div>
                      {locale === 'ja-JP' ? (
                        <DatePicker
                          className='rounded border-gray-100 p-1.5 text-base outline-0'
                          selected={new Date(editedComment.date)}
                          onChange={(date) => handleDateChange(date,"edit")}
                          required
                          data-testid='commentDateInput'
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
                              locale='ja-JP'
                            />
                          )}
                        />
                      ) : (
                        <DatePicker
                          className='rounded border-gray-100 p-1.5 text-base outline-0'
                          selected={new Date(editedComment.date)}
                          onChange={(date) => handleDateChange(date,"edit")}
                          required
                          data-testid='commentDateInput'
                          dropdownMode='select'
                          locale='en'
                          dateFormat='MM/dd/yyyy'
                          minDate={subYears(new Date(), 10)}
                        />
                      )}
                    </div>
                    <TextInput
                      className='flex-grow rounded border border-black p-2 text-base outline-0'
                      type='text'
                      placeholder={t.inputPlaceHolder}
                      value={editedComment.memo}
                      onChange={(e) =>
                        dispatch(updateEditedComment({ ...editedComment, memo: e.target.value }))
                      }
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
                    <div className='truncate text-sm font-medium leading-5' data-testid="commentList">
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
