// <!-- 必要なものをimport -->
import { useState } from 'react'
import { supabase } from '../utils/supabase'

import useStore from '../store/store'
import { useMutateComment } from '../hooks/useMutateComment'
import { useQueryComments } from '../hooks/useQueryComments'

import { useContext } from 'react'
import { UserContext } from '../utils/UserContext'

import { checkAllowanceComment } from '../functions/checkAllowanceComment'

import * as AiIcons from 'react-icons/ai'
import { ActionIcon } from '@mantine/core'
// import { DatePicker } from '@mantine/dates';

import InputCommentSingle from './InputCommentSingle';

export default function InputComments({ ticker, t }) {
  const { user: contextUser, session: contextSession, rank } = useContext(UserContext)
  const { editedComment, resetEditedComment } = useStore()
  const update = useStore((state) => state.updateEditedComment)
  const { createCommentMutation, updateCommentMutation, deleteCommentMutation } = useMutateComment()
  const { data: commentData, status } = useQueryComments()

  const commentList = commentData?.filter((data) => {
    return data.ticker === ticker
  })

  const [editItem, setEditItem] = useState('')
  const { editStatus, setEditStatus } = useState(false)
  const { canCommentInput } = checkAllowanceComment(rank, commentData)

  if (status === 'error') {
    return <div>Error</div>
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
        setEditStatus(false)
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
        {canCommentInput ? <div>{t.inputCan}</div> : <div>{t.inputCannot}</div>}
      </div>

      <div className='my-2 flex flex-wrap gap-2'>
        <input
          className='rounded border border-black p-2 text-base'
          type='date'
          value={editedComment.date}
          onChange={(e) => update({ ...editedComment, date: e.target.value })}
          required
          data-testid='commentDateInput'
        />
        <input
          className='w-full rounded border border-black p-2 text-base'
          type='text'
          placeholder={t.inputPlaceHolder}
          value={editedComment.memo}
          onChange={(e) => update({ ...editedComment, memo: e.target.value })}
          required
          data-testid='commentMemoInput'
        />

        {editItem != '' ? (
          <div>
            <button className='btn-black' onClick={() => submitComment()}>
              Edit
            </button>
            <button className='btn-black' onClick={() => editCancel()}>
              EditCancel
            </button>
          </div>
        ) : (
          <button
            className='btn-black rounded border border-black p-2'
            onClick={() => submitComment()}
            disabled={!canCommentInput}
            data-testid='addComment'
          >
            Add
          </button>
        )}
      </div>

      <div className='overflow-hidden rounded-md bg-white shadow'>
        <ul>
          {commentList?.map((comment) => (
            <li className='block w-full border-2 border-gray-300' key={comment.id}>
              <div className='flex items-center px-4 py-2 sm:px-6'>
                <div className='flex min-w-0 flex-1 items-center'>
                  <div className='truncate text-sm font-medium leading-5'>
                    {comment.date}/{comment.memo}
                  </div>
                </div>

                <ActionIcon
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    updateComment(comment)
                  }}
                  className='ml-2 p-1'
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
                  className='ml-2 p-1'
                >
                  <AiIcons.AiFillDelete />
                </ActionIcon>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <hr />

      {commentList?.map(comment=>{
        return <InputCommentSingle t={t} key={comment.id} comment={comment} ticker={ticker}/>
      })}
      


    </div>
  )
}
