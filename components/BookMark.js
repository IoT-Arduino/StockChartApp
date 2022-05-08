// <!-- 必要なものをimport -->
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

export default function BookMark({ user, ticker }) {

  //  <!-- BookMark -->
  const [star, setStar] = useState(false)
  const [bookMarkId, setBookMarkId] = useState('')
  //  <!-- 入力したtodo -->
  const [errorText, setError] = useState('')

  useEffect(() => {
      fetchBookMark()
  }, [])

  // <!-- supabaseに接続 -->
  const fetchBookMark = async () => {
    let { data: items, error } = await supabase
      .from('bookmark')
      .select('*')
      .eq('ticker', ticker)
      .single()

    if (error) console.log('error', error)
    else {
      setStar(items.bookmark)
      setBookMarkId(items.id)
      // console.log(items)
    }
  }

   const toggleStar = async () => {   
     if (!star) {
       let { data, error } = await supabase
          .from('bookmark')
          .insert({ bookmark: true, user_id: user.id, ticker})
          .single()
        if (error) setError(error.message)
        else {
          setStar(true)
        }
     } else {
       let { data, error } = await supabase.from('bookmark').delete().eq('id', bookMarkId)
        if (error) setError(error.message)
        else {
          setStar(false)
        }
     }
    }

  return (
    <div className="w-full">
      {!!errorText && <Alert text={errorText} />}
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            toggleStar()
          }}
          className="w-4 h-4 ml-2 border-2 hover:border-black rounded"
        >
          <p>{star ? 'BookMark ★' : 'BookMark ×'}</p>
        </button>
    </div>
  )
}


const Alert = ({ text }) => (
  <div className="rounded-md bg-red-100 p-4 my-3">
    <div className="text-sm leading-5 text-red-700">{text}</div>
  </div>
)
