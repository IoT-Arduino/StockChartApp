// <!-- 必要なものをimport -->
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'
import { Button } from "@supabase/ui";

export default function BookMark({ user, ticker }:{ user:any, ticker:string}) {

  //  <!-- BookMark -->
  const [star, setStar] = useState<boolean|null>(false)
  const [errorText, setError] = useState('')

  useEffect(() => {
      fetchBookMark()
  }, [])

  // <!-- supabaseに接続 -->  // user_id とtickerでマッチさせる。
  const fetchBookMark = async () => {
    let { data: items, error } = await supabase
      .from('bookmark')
      .select('*')
      .match({ticker: ticker, user_id: user.id})
    
    if (error) console.log('error', error)
    else {
      if(items){
        setStar(items.bookmark)
      }
    }
  }

   const toggleStar = async () => {   
     if (!star) {
       let { data, error } = await supabase
          .from('bookmark')
          .insert({ bookmark: true, user_id: user.id, ticker})

        if (error) setError(error.message)
        else {
          setStar(true)
        }
     } else {
       let { data, error } = await supabase.from('bookmark').delete().match({ticker: ticker, user_id: user.id})
        if (error) setError(error.message)
        else {
          setStar(false)
        }
     }
    }

  return (
    <div>
      {/* {!!errorText && <Alert text={errorText} />} */}
        <Button block
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            toggleStar()
          }}
          className="h-4 ml-2 border-2 hover:border-black rounded"
        >
          {star ? 'BookMark ★' : 'BookMark ×'}
        </Button>
    </div>
  )
}
