import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { UserContext } from '../utils/UserContext'


import {FaRegStickyNote} from 'react-icons/fa'
import { AiOutlineHome, AiOutlineUnorderedList, AiOutlineLogin,AiOutlineTwitter,AiFillMediumSquare } from 'react-icons/ai'

// i18n
import en from '../locales/en/en'
import ja from '../locales/ja/ja'

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

  // i18n 対応用
  const router = useRouter()
  const { locale } = router

  const changeLanguage = (e: any) => {
    const locale = e.target.value
    router.push(`${router.asPath}`, `${router.asPath}`, { locale })
  }

  let t
  if (locale === 'ja-JP') {
    t = ja
  } else {
    t = en
  }

  return (
    <footer className='bg-gray-200 p-2 text-center text-gray-600 '>
      <div className='hidden sm:flex justify-around items-center'>
        <small className='text-l mr-5 inline-block'>&copy; 2022 TenQ.cc US-Stock Chart</small>

        <div>
          <a href='https://twitter.com/Sa10shitoushi'  
          rel="noopener noreferrer" className='text-xs no-underline'>
              <AiOutlineTwitter />
              <span className='ml-2'>Twitter</span>
          </a>
        </div>
 
        <div>
          <a href='https://note.com/satoshi_toushi'  
          rel="noopener noreferrer" className='text-xs no-underline'>
              <FaRegStickyNote />
              <span className='ml-2'>note</span>
          </a>
        </div>

        <div>
          <a href='https://medium.com/@tenq'  
          rel="noopener noreferrer" className='text-xs no-underline'>
              <AiFillMediumSquare />
              <span className='ml-2'>medium</span>
          </a>
        </div>

        <Link href='/rules/discraimer'>
          <a className='text-xs no-underline'>{t.disclaimer}</a>
        </Link>
        <select onChange={changeLanguage} defaultValue={locale} className='ml-8'>
          <option value='en-US'>English</option>
          <option value='ja-JP'>日本語</option>
        </select>
      </div>

      {/* Mobile Footer  */}
      <div className='flex justify-around sm:hidden'>
        <div>
          <Link href='/'>
            <a className='text-xs no-underline'>
              <AiOutlineHome />
              <span className='block'>Home</span>
            </a>
          </Link>
        </div>
        <div>
          <Link href='/stocks'>
            <a className='text-xs no-underline'>
              <AiOutlineUnorderedList />
              <span className='block'>{t.stockList}</span>
            </a>
          </Link>
        </div>

        {!signIn ? (
          <div>
            <Link href='/auth/signin'>
              <a className='text-xs no-underline'>
                <AiOutlineLogin />
                <span className='block'>Login</span>
              </a>
            </Link>
          </div>
        ) : (
          <div>
            <Link href='/member'>
              <a className='text-xs no-underline'>
                <AiOutlineLogin />
                <span className='block'>{t.member}</span>
              </a>
            </Link>
          </div>
        )}
      </div>
    </footer>
  )
}
