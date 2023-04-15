import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../utils/supabase'
import { useContext } from 'react'
import { UserContext } from '../utils/UserContext'
import useStore from '../store/store'
import { useMutateComment } from '../hooks/useMutateComment'
import { useQueryComments } from '../hooks/useQueryComments'
import { checkAllowanceComment } from '../functions/checkAllowanceComment'
// import InputCommentSingle from './InputCommentSingle'

// Mantine
import { ActionIcon } from '@mantine/core'
// import { DatePicker } from '@mantine/dates'
import { TextInput, Button } from '@mantine/core'
import { DateInput } from 'mantine-dates-6'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'

import * as AiIcons from 'react-icons/ai'

export default function InputComments({ ticker, t }) {
  const { user: contextUser, session: contextSession, rank } = useContext(UserContext)
  const { editedComment, resetEditedComment } = useStore()
  const update = useStore((state) => state.updateEditedComment)
  const { createCommentMutation, updateCommentMutation, deleteCommentMutation } = useMutateComment()
  const { data: commentData, status } = useQueryComments()

  const router = useRouter()
  const { locale } = router

  const commentList = commentData?.filter((data) => {
    return data.ticker === ticker
  })

  const [editItem, setEditItem] = useState('')
  const { editStatus, setEditStatus } = useState(false)
  const { canCommentInput } = checkAllowanceComment(rank, commentData)

  if (status === 'error') {
    return <div>Error</div>
  }

  // <!-- 日付関連処理 -->
  let formattedDate = ''
  if (editedComment.date !== '') {
    formattedDate = dayjs(editedComment.date).toDate()
  }

  const dateUpdate = (e) => {
    if (e) {
      const ymd = `${e.getFullYear()}-${e.getMonth() + 1}-${e.getDate()} `
      update({ ...editedComment, date: ymd })
    }
  }

  //  <!-- commentの追加 -->
  const submitComment = async () => {
    if (editedComment.memo === '' || editedComment.date === '') {
      alert(`${t.inputRequiredAlert}`)
      return
    }

    if (editItem != '') {
      try {
        updateCommentMutation.mutate({
          id: editedComment.id,
          memo: editedComment.memo,
          date: editedComment.date,
        })
        setEditItem('')
        // setEditStatus(false)
      } catch (error) {
        console.log('error', error)
      }
    } else {
      createCommentMutation.mutate({
        memo: editedComment.memo,
        date: editedComment.date,
        ticker: ticker,
        user_id: supabase.auth.user()?.id, // 重要！！
      })
    }
  }

  //  <!-- Update comment-->
  const updateComment = async (comment) => {
    // setEditStatus(true)
    setEditItem(comment.id)
    update({
      id: comment.id,
      ticker: ticker,
      date: comment.date,
      memo: comment.memo,
    })
  }

  const deleteComment = (comment) => {
    let confirmDelete = confirm(`${t.inputDeleteAlert}`)
    if (confirmDelete) {
      deleteCommentMutation.mutate(comment.id)
    } else {
      return
    }
  }

  const editCancel = () => {
    setEditItem('')
    resetEditedComment()
  }

  return (
    <div className='w-full'>
      <h4 className='font-xl mt-10 mb-2 font-bold'>{t.inputCommentTitle}</h4>
      <div data-testid='inputCommentStatus'>
        {canCommentInput ? '' : <div>{t.inputCannot}</div>}
      </div>

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
            data-testid='commentDateInput'
          />
        ) : (
          <DateInput
            placeholder='Pick date'
            // inputFormat='MM-DD-YYYY'
            value={formattedDate}
            onChange={(e) => dateUpdate(e)}
            defaultValue={formattedDate}
            required
            data-testid='commentDateInput'
          />
        )}

        {/* <input
            className='rounded border border-black p-2 text-base'
            type='date'
            value={editedComment.date}
            onChange={(e) => update({ ...editedComment, date: e.target.value })}
            required
            data-testid='commentDateInput'
          /> */}

        <div className='grow'>
          <TextInput
            placeholder={t.inputPlaceHolder}
            value={editedComment.memo}
            onChange={(e) => update({ ...editedComment, memo: e.target.value })}
            required
            data-testid='commentMemoInput'
          />
        </div>

        {/* <input
          className='w-full rounded border border-black p-2 text-base'
          type='text'
          placeholder={t.inputPlaceHolder}
          value={editedComment.memo}
          onChange={(e) => update({ ...editedComment, memo: e.target.value })}
          required
          data-testid='commentMemoInput'
        /> */}

        {editItem != '' ? (
          <div>
            <Button
              variant='outline'
              color='teal'
              onClick={() => submitComment()}
              data-testid='updateComment'
            >
              {t.inputSave}
            </Button>
            <Button
              variant='outline'
              color='teal'
              onClick={() => editCancel()}
              data-testid='cancelComment'
            >
              {t.inputCancel}
            </Button>
          </div>
        ) : (
          <div>
            <Button
              // className='btn-black rounded border border-black p-2'
              variant='outline'
              color='teal'
              onClick={() => submitComment()}
              disabled={!canCommentInput}
              data-testid='addComment'
            >
              {t.inputSave}
            </Button>
            <Button
              // className='btn-black rounded border border-black p-2'
              variant='outline'
              color='teal'
              onClick={() => resetEditedComment()}
              disabled={!canCommentInput}
              data-testid='resetComment'
            >
              {t.inputCancel}
            </Button>
          </div>
        )}
      </div>

      <div className='mb-8 overflow-hidden rounded-md bg-white shadow'>
        <ul className='px-2'>
          {commentList?.map((comment) => (
            <li className='block w-full border-2 border-gray-300' key={comment.id}>
              <div className='flex flex-wrap items-center py-2'>
                <div className='flex min-w-0 flex-1 items-center'>
                  <div className='truncate text-sm font-medium leading-5'>
                    <span className='mr-2'>{comment.date}</span>
                    <span>{comment.memo}</span>
                  </div>
                </div>

                <ActionIcon
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    updateComment(comment)
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
            </li>
          ))}
        </ul>
      </div>

      <hr />

      {/* {commentList?.map(comment=>{
        return <InputCommentSingle t={t} key={comment.id} comment={comment} ticker={ticker}/>
      })} */}
    </div>
  )
}
