// <!-- 必要なものをimport -->
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

// import { Button } from '@mantine/core'
// import { useToggle } from '@mantine/hooks'
import * as AiIcons from 'react-icons/ai'

import { useMutateBookMark } from '../hooks/useMutateBookMark'
import { useQueryBookMark } from '../hooks/useQueryBookMark'

import { useContext } from 'react'
import { UserContext } from '../utils/UserContext'

import { checkAllowanceBookMark } from '../functions/checkAllowanceBookMark'

export default function BookMark({ ticker,t }) {
  const { user, session, rank } = useContext(UserContext)
  const { createBookMarkMutation, deleteBookMarkMutation } = useMutateBookMark()

  const { data: bookMarkList, status } = useQueryBookMark()

  const bookMarkData = bookMarkList?.filter((data) => {
    return data.ticker === ticker
  })

  const { canBookMarkInput } = checkAllowanceBookMark(rank, bookMarkList)

  //  <!-- BookMark -->
  const [star, setStar] = useState()
  const [errorText, setError] = useState('')
 
  useEffect(() => {
      setStar(bookMarkData?.length > 0)
  }, [bookMarkData])

  const toggleStar = async (e) => {
    if (!star && canBookMarkInput) {
      createBookMarkMutation.mutate({
        bookmark: true,
        ticker: ticker,
        user_id: supabase.auth.user()?.id, // 重要！！
      })
      setStar(true)
    } else if (!star && canBookMarkInput === false) {
      alert(`${t.inputLimitAlert}`)
      return
    } else {
      console.log(bookMarkData[0].id)
      deleteBookMarkMutation.mutate(bookMarkData[0].id)
      setStar(false)
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
          toggleStar(e)
        }}
        className='ml-2 cursor-pointer rounded border-2 p-2 text-green-600 hover:border-black'
      >
        {star ? (
          <AiIcons.AiTwotoneStar size={16} className='align-middle text-green-600' />
        ) : (
          <AiIcons.AiOutlineStar size={16} className='align-middle text-green-600' />
        )}
        <span className='ml-1 text-sm'>BookMark</span>
      </div>
    </div>
  )
}
