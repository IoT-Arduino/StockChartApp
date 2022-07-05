import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { UserContext } from '../utils/UserContext'
import * as AiIcons from 'react-icons/ai'

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
    <footer className='bg-gray-200 p-2 text-center text-gray-600'>
      <div className='hidden sm:block'>
        <small className='text-l mr-5 inline-block'>&copy; 2022 TenQ.cc US-Stock Chart</small>
        <Link href='/rules/discraimer'>
          <a className='text-xs no-underline'>{t.disclaimer}</a>
        </Link>
        <select onChange={changeLanguage} defaultValue={locale} className='ml-8'>
          <option value='en-US'>English</option>
          <option value='ja-JP'>日本語</option>
        </select>
      </div>
      <div className='flex justify-around sm:hidden'>
        <div>
          <Link href='/'>
            <a className='text-xs no-underline'>
              <AiIcons.AiOutlineHome />
              <span className='block'>Home</span>
            </a>
          </Link>
        </div>
        <div>
          <Link href='/stocks'>
            <a className='text-xs no-underline'>
              <AiIcons.AiOutlineUnorderedList />
              <span className='block'>{t.stockList}</span>
            </a>
          </Link>
        </div>

        {!signIn ? (
          <div>
            <Link href='/auth/signin'>
              <a className='text-xs no-underline'>
                <AiIcons.AiOutlineLogin />
                <span className='block'>Login</span>
              </a>
            </Link>
          </div>
        ) : (
          <div>
            <Link href='/member'>
              <a className='text-xs no-underline'>
                <AiIcons.AiOutlineLogin />
                <span className='block'>{t.member}</span>
              </a>
            </Link>
          </div>
        )}
      </div>
    </footer>
  )
}
