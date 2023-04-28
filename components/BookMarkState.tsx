import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { UserContext } from '../utils/UserContext'
import { supabase } from '../utils/supabase'
import { useMutateBookMark } from '../hooks/useMutateBookMark'
import { useQueryBookMark } from '../hooks/useQueryBookMark'
import * as AiIcons from 'react-icons/ai'
import { checkAllowanceBookMark } from '../functions/checkAllowanceBookMark'

type BookMarkProps = {
  ticker: string
  t: {
    inputLimitAlert: string
  }
}

type CreateBookMarkData = {
  bookmark: boolean
  ticker: string
  user_id: string
}

export default function BookMark({ ticker, t }: BookMarkProps) {
  const { user, session, rank } = useContext(UserContext)
  const { createBookMarkMutation, deleteBookMarkMutation } = useMutateBookMark()

  const { data: bookMarkList, status } = useQueryBookMark()

  const bookMarkData = bookMarkList?.filter((data) => {
    return data.ticker === ticker
  })

  const { canBookMarkInput } = checkAllowanceBookMark(rank, bookMarkList)

  //  <!-- BookMark -->
  const [star, setStar] = useState<boolean | undefined>()
  const [errorText, setError] = useState<string>('')

  useEffect(() => {
    if (bookMarkData && bookMarkData.length > 0) {
      setStar(true)
    } else {
      setStar(false)
    }
  }, [bookMarkData])

  const toggleStar = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (!star && canBookMarkInput) {
      createBookMarkMutation.mutate(
        {
          bookmark: true,
          ticker: ticker,
          user_id: supabase.auth.user()?.id, // 重要！！
        } as CreateBookMarkData,
        {
          onSuccess: () => {
            setStar(true)
          },
        }
      )
    } else if (!star && canBookMarkInput === false) {
      alert(`${t.inputLimitAlert}`)
      return
    } else {
      if (bookMarkData && bookMarkData.length > 0) {
        deleteBookMarkMutation.mutate(bookMarkData[0].id.toString(), {
          onSuccess: () => {
            setStar(false)
          },
        })
      }
    }
  }

  return (
    <div>
      <div
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          toggleStar(e)
        }}
        className='ml-2 cursor-pointer rounded border-2 p-2 text-green-600 hover:border-black'
        data-testid='bookmarkCheck'
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
