// <!-- 必要なものをimport -->
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

import useStore from '../store/store'
import { useMutateComment } from '../hooks/useMutateComment'
import { useQueryComments } from '../hooks/useQueryComments'

import { useContext } from 'react'
import { UserContext } from '../utils/UserContext'

import { checkAllowanceComment } from '../functions/checkAllowanceComment'

export default function InputComments({ ticker }) {
  const { editedComment, resetEditedComment } = useStore()
  const update = useStore((state) => state.updateEditedComment)
  const { createCommentMutation, updateCommentMutation, deleteCommentMutation } = useMutateComment()
  const { data: commentData, status } = useQueryComments()

  const commentList = commentData?.filter((data) => {
    return data.ticker === ticker
  })

  const { user: contextUser, session: contextSession, rank } = useContext(UserContext)

  //  <!-- comment -->
  const [comments, setComments] = useState([])
  const [editItem, setEditItem] = useState('')

  const { canCommentInput } = checkAllowanceComment(rank, commentData)
  
  // console.log(canCommentInput)

  if (status === 'error') {
    return <div>Error</div>
  }

  //  <!-- commentの追加 -->
  const submitComment = async () => {
    // e.preventDefault()

    if (editItem != '') {
      try {
        updateCommentMutation.mutate({
          id: editedComment.id,
          memo: editedComment.memo,
          date: editedComment.date,
        })

        setEditItem('')
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
    setEditItem(comment.id)
    update({
      id: comment.id,
      ticker: ticker,
      date: comment.date,
      memo: comment.memo,
    })
  }

  const editCancel = () => {
    console.log('cancel')
    setEditItem('')
    resetEditedComment()
  }

  return (
    <div className='w-full'>
      <h4 className='mt-10 mb-2 font-bold font-xl'>株式メモ情報:{commentList?.length}</h4>
      <div>{canCommentInput ? <div>入力可</div> : <div>入力不可</div>}</div>

      <div className='flex gap-2 my-2 flex-wrap'>
        <input
          className='rounded p-2 border border-black text-base'
          type='date'
          value={editedComment.date}
          onChange={(e) => update({ ...editedComment, date: e.target.value })}
        />
        <input
          className='rounded w-full p-2 border border-black text-base'
          type='text'
          placeholder='メモを入力してください'
          value={editedComment.memo}
          onChange={(e) => update({ ...editedComment, memo: e.target.value })}
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
            className='btn-black p-2 border border-black rounded'
            onClick={() => submitComment()}
            disabled={!canCommentInput}
          >
            Add
          </button>
        )}
      </div>

      <div className='bg-white shadow overflow-hidden rounded-md'>
        <ul>
          {commentList?.map((comment) => (
            <li className='w-full block border-2 border-gray-300' key={comment.id}>
              <div className='flex items-center px-4 py-2 sm:px-6'>
                <div className='min-w-0 flex-1 flex items-center'>
                  <div className='text-sm leading-5 font-medium truncate'>
                    {comment.date}/{comment.memo}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    updateComment(comment)
                  }}
                  className='p-1 ml-2 border-2 hover:border-black rounded'
                >
                  E
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    deleteCommentMutation.mutate(comment.id)
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
