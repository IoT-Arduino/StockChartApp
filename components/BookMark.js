// <!-- 必要なものをimport -->
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

export default function BookMark({ user, ticker }) {

  //  <!-- todo -->
  const [items, setItems] = useState()
  const [bookMark, setBookMark] = useState(false)
  //  <!-- 入力したtodo -->
  const [errorText, setError] = useState('')

  useEffect(() => {
      fetchItem()
      console.log(items)
  }, [])

  // <!-- supabaseに接続 -->
  const fetchItem = async () => {
    let { data: items, error } = await supabase
      .from('bookmark')
      .select('*')
      .eq('ticker', ticker)
      .single()

    if (error) console.log('error', error)
    else {
      setItems(items)
      setBookMark(items.bookmark)
    }
  }

   const toggleBookMark = async (id) => {   
    const toggledBookMark = !bookMark
        try {
            const { data } = await supabase
            .from('bookmark')
            .update({ 'bookmark': toggledBookMark })
            .eq('id', id)
            .single()
            setBookMark(toggledBookMark)
        console.log(data)
        } catch (error) {
        console.log('error', error)
        }
    }


  return (
    <div className="w-full">
      <h1 className="mb-12">BookMark</h1> <p>{bookMark ? '★' : '×'}</p>
      {!!errorText && <Alert text={errorText} />}

        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            toggleBookMark(items.id)
          }}
          className="w-4 h-4 ml-2 border-2 hover:border-black rounded"
        >
          U
        </button>
    </div>
  )
}


const Alert = ({ text }) => (
  <div className="rounded-md bg-red-100 p-4 my-3">
    <div className="text-sm leading-5 text-red-700">{text}</div>
  </div>
)
