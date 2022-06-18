import Link from 'next/link'
import * as AiIcons from 'react-icons/ai'
import React, { useState, useEffect } from 'react'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { UserContext } from '../utils/UserContext'

export const Footer = () => {
  const [signIn, setSignIn] = useState(false)
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (!user) {
      setSignIn(false)
    } else {
      setSignIn(true)
    }
  }, [user])

  return (
    <footer className='bg-gray-200 p-2 text-center text-gray-600'>
      <div className="hidden sm:block">
        <small className='text-l mr-5 inline-block'>&copy; 2022 TenQチャート</small>
        <Link href='/rules/discraimer'>
          <a className='text-xs no-underline'>免責事項</a>
        </Link>
        </div>
      <div className="sm:hidden flex justify-around">
        <div>
        <Link href='/'>
          <a className='text-xs no-underline'><AiIcons.AiOutlineHome /><span className="block">Home</span></a>
        </Link>
        </div>
        <div>
        <Link href='/stocks'>
        <a className='text-xs no-underline'><AiIcons.AiOutlineUnorderedList /><span className="block">株式一覧</span></a>
        </Link>
        </div>

        {!signIn ? ( <div>
          <Link href='/auth/signin'>
          <a className='text-xs no-underline'><AiIcons.AiOutlineLogin /><span className="block">Login</span></a>
          </Link>
        </div>) : ( <div>
          <Link href='/member'>
          <a className='text-xs no-underline'><AiIcons.AiOutlineLogin /><span className="block">会員ページ</span></a>
          </Link>
        </div>)}

      </div>
    </footer>
  )
}
