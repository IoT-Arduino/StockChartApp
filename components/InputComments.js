// <!-- 必要なものをimport -->
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

export default function InputComments({ user, ticker }) {
  //  <!-- comment -->
  const [comments, setComments] = useState([])
  //  <!-- 入力したcomment -->
  const [newCommentText, setNewCommentText] = useState('')
  const [newDate, setNewDate] = useState('')
  const [editItem,setEditItem] = useState('')
  const [errorText, setError] = useState('')

  useEffect(() => {
    fetchComments()
  }, [])

  // <!-- supabaseに接続 -->
  const fetchComments = async () => {
    //   <!-- .from(table名).select('カラム名').order(ソートの条件) -->
    let { data: comments, error } = await supabase
      .from('comments')
      .select('*')
      .eq('ticker', ticker)
      .order('id', true)
    if (error) console.log('error', error)
    else setComments(comments)
  }

  //  <!-- commentの追加 -->
  const submitComment = async (commentText, date) => {

    if (editItem!='') {
      let comment = commentText.trim()
      try {
        let { data, error } = await supabase
          .from('comments')
          .update({ memo: comment, date })
          .eq('id', editItem)
          .single()
        
          setComments([...comments, data])
          setNewCommentText('')
          setNewDate('')
          setEditItem('')
      } catch (error) {
        console.log('error', error)
      }
    } else {
      let comment = commentText.trim()
      if (comment.length) {
        let { data, error } = await supabase
          .from('comments')
          .insert({ memo: comment, user_id: user.id, ticker, date })
          .single()
        if (error) setError(error.message)
        else {
          setComments([...comments, data])
          setNewCommentText('')
          setNewDate('')
        }
      }
    }

  }

  //  <!-- Update comment-->
  const updateComment = async (id) => {

    setEditItem(id)

    const filteredComments = comments.filter(item => {
      return item.id != id
    })

    const editComment = comments.find(item =>{
      return item.id == id
    })

    setComments(filteredComments)
    setNewCommentText(editComment.memo)
    setNewDate(editComment.date)

  }


  // <!-- commentの削除 -->
  const deleteComment = async (id) => {
    try {
      await supabase.from('comments').delete().eq('id', id)
      setComments(comments.filter((x) => x.id != id))
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div className="w-full">
      <h4 className="mt-10 mb-2 font-bold font-xl">株式メモ情報</h4>
      <div className="flex gap-2 my-2">
        <input
          className="rounded w-full p-2 border border-black"
          type="date"
          value={newDate}
          onChange={(e) => {
            setError('')
            setNewDate(e.target.value)
          }}
        />
        <input
          className="rounded w-full p-2 border border-black"
          type="text"
          placeholder="メモを入力してください"
          value={newCommentText}
          onChange={(e) => {
            setError('')
            setNewCommentText(e.target.value)
          }}
        />

        {editItem!='' ? (
          <button
            className="btn-black"
            onClick={() => submitComment(newCommentText, newDate)}
          >
            Edit
          </button>
        ) : (
          <button
            className="btn-black p-2 border border-black rounded"
            onClick={() => submitComment(newCommentText, newDate)}
          >
            Add
          </button>
        )}
      </div>
      {!!errorText && <Alert text={errorText} />}
      <div className="bg-white shadow overflow-hidden rounded-md">
        <ul>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onDelete={() => deleteComment(comment.id)}
              onUpdate={() => updateComment(comment.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

// <!-- ☑の処理 -->
const Comment = ({ comment, onDelete,onUpdate }) => {

  return (
    <li className="w-full block border-2 border-gray-300">
      <div className="flex items-center px-4 py-2 sm:px-6">
        <div className="min-w-0 flex-1 flex items-center">
          <div className="text-sm leading-5 font-medium truncate">
            {comment.date}/{comment.memo}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onUpdate(e)
          }}
          className="p-1 ml-2 border-2 hover:border-black rounded"
        >
          E
        </button>

        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onDelete()
          }}
          className="p-1 ml-2 border-2 hover:border-black rounded"
        >X
        </button>
      </div>
    </li>
  )
}

const Alert = ({ text }) => (
  <div className="rounded-md bg-red-100 p-4 my-3">
    <div className="text-sm leading-5 text-red-700">{text}</div>
  </div>
)
