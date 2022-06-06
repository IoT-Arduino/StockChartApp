// <!-- 必要なものをimport -->
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

import { Button } from '@mantine/core'
import { useToggle } from '@mantine/hooks'
import * as AiIcons from 'react-icons/ai'

export default function BookMark({ user, ticker }: { user: any; ticker: string }) {
  //  <!-- BookMark -->
  const [star, setStar] = useState<boolean | null>(false)
  const [errorText, setError] = useState('')

  useEffect(() => {
    fetchBookMark()
  }, [])

  // <!-- supabaseに接続 -->  // user_id とtickerでマッチさせる。
  const fetchBookMark = async () => {
    let { data: items, error } = await supabase
      .from('bookmark')
      .select('*')
      .match({ ticker: ticker, user_id: user.id })
    if (error) console.log('error', error)
    else {
      if (items.length) {
        setStar(true)
      }
    }
  }

  const toggleStar = async () => {
    if (!star) {
      let { data, error } = await supabase
        .from('bookmark')
        .insert({ bookmark: true, user_id: user.id, ticker })

      if (error) setError(error.message)
      else {
        setStar(true)
      }
    } else {
      let { data, error } = await supabase
        .from('bookmark')
        .delete()
        .match({ ticker: ticker, user_id: user.id })
      if (error) setError(error.message)
      else {
        setStar(false)
      }
    }
  }

  // console.log(star)

  return (
    <div>
      {/* {!!errorText && <Alert text={errorText} />} */}

      <div
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          toggleStar()
        }}
        className='ml-2 rounded border-2 hover:border-black p-2 cursor-pointer text-green-600'
      > 
        {star ? (
           <AiIcons.AiTwotoneStar size={16} className='text-green-600 align-middle'/>
        ) : (
          <AiIcons.AiOutlineStar size={16} className='text-green-600 align-middle'/>
        )}
        <span className="ml-1 text-sm">BookMark</span> 
      </div>
    </div>
  )
}
