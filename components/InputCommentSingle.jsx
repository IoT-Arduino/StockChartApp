import React from 'react'
import useStore from '../store/store'
import { useState } from 'react'
import * as AiIcons from 'react-icons/ai'
import { ActionIcon } from '@mantine/core'

const InputCommentSingle = ({ e, t, comment, ticker }) => {
  const update = useStore((state) => state.updateEditedComment)
  const { editedComment, resetEditedComment } = useStore()

  const [editItem, setEditItem] = useState('')

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
    <div className='flex min-w-0 flex-1 items-center'>
      <div className='truncate text-sm font-medium leading-5'>
        <input
          className='rounded border border-black p-2 text-base'
          type='date'
          value={comment.date}
          onChange={(e) => update({ ...editedComment, date: e.target.value })}
          required
          data-testid='commentDateInput'
        />
        <input
          className='rounded border border-black p-2 text-base'
          type='text'
          placeholder={t.inputPlaceHolder}
          value={comment.memo}
          onChange={(e) => update({ ...editedComment, memo: e.target.value })}
          required
          data-testid='commentMemoInput'
        />
      </div>
      <button className='btn-black' onClick={() => submitComment()}>
        Edit
      </button>
      <button className='btn-black' onClick={() => editCancel()}>
        EditCancel
      </button>
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
  )
}

export default InputCommentSingle
