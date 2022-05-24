import Link from 'next/link'
import Image from 'next/image'
import { data } from 'autoprefixer'
import React, { useState } from 'react'
import logo from '../public/logo.png'
import menu from '../public/menu-hamg.png'

import { supabase } from '../utils/supabase'
import { useContext } from 'react'
import { UserContext } from '../utils/UserContext'
import { useRouter } from 'next/router'

const menuList = [
  {
    name: 'Top',
    link: '/',
  },
  {
    name: '株式一覧',
    link: '/stocks',
  },
  {
    name: '会員ページ',
    link: '/member',
  },
]

export const HeaderNav = () => {
  const data = menuList
  const [openMenu, setOpenMenu] = useState(false)
  const { replace } = useRouter()
  const { user } = useContext(UserContext)

  const menuFunction = () => {
    setOpenMenu(!openMenu)
  }

  const signOut = () => {
    supabase.auth.signOut()
    replace('/')
  }

  return (
    <nav className='flex max-w-7xl mx-auto'>
      <div className='flex-none sm:flex-1 md:flex-1 lg:flex-1 xl:flex-1'>
        <Link href='/'>
          <a>
            <Image src={logo} alt='logo' width={75} height={75} />
          </a>
        </Link>
      </div>
      {openMenu ? (
        <div className='absolute top-0 right-0 z-10 flex min-h-fit  min-w-full flex-row'>
          <div className='basis-1/2'></div>

          <div className='basis-1/2 bg-white'>
            <ul className=' border-l-2 text-center '>
              <li className='border-b-2 p-2'>
                <button onClick={menuFunction} className='font-bold'>
                  close
                </button>
              </li>

              {data.map((value, index) => (
                <li key={index} className='border-b-2 p-2'>
                  <a href={value.link} onClick={menuFunction}>
                    {value.name}
                  </a>
                </li>
              ))}

              {!user ? (
                <li className='border-b-2 p-2'>
                  <Link href='/signin'>
                    <a className='font-bold'>サインイン</a>
                  </Link>
                </li>
              ) : (
                <li className='border-b-2 p-2'>
                  <button onClick={signOut} className='font-bold'>
                    サインアウト
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      ) : undefined}
      <div className='m-5 flex-initial font-bold text-[#abc5c5] '>
        <ul className='hidden  flex-initial text-left md:flex'>
          {data.map((value, index) => (
            <li key={index} className='p-4'>
              <a href={value.link}>{value.name} </a>
            </li>
          ))}

          {!user ? (
            <li className='p-4'>
              <Link href='/signin'>
                <a className='font-bold'>サインイン</a>
              </Link>
            </li>
          ) : (
            <li className='p-4'>
              <button onClick={signOut} className='font-bold'>
                サインアウト
              </button>
            </li>
          )}
        </ul>
      </div>
      <button onClick={menuFunction} className='absolute top-2 right-2 flex-initial md:hidden'>
        <Image src={menu} alt='menu' width={50} height={50} />
      </button>
    </nav>
  )
}
