import React, { useState, useEffect } from 'react'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

// Style & Images
import styles from './Navbar.module.css'
import { IconContext } from 'react-icons'
// import * as FaIcons from 'react-icons/fa'
import { FaBars, FaRegStickyNote } from 'react-icons/fa'

// import * as AiIcons from 'react-icons/ai'

import {
  AiOutlineHome,
  AiOutlineUnorderedList,
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineSearch,
  AiOutlineClose,
  AiOutlineTwitter,
  AiFillMediumSquare,
} from 'react-icons/ai'

import { IoDocumentTextOutline } from 'react-icons/io5'
import logo from '../public/logo.png'
import { Modal } from '@mantine/core'

// Supabase
import { supabase } from '../utils/supabase'
import { UserContext } from '../utils/UserContext'

// Components
import SearchBar from './HeroSearchBar'

// JSON Data
import { codeList } from '../data/stockCode/US-StockList'

// i18n
import en from '../locales/en/en'
import ja from '../locales/ja/ja'

// 他に使用されている箇所、全体Index,StockIndex,Navbar
const codeListNotUnlist = codeList.filter((item) => {
  return item.Unlist != 'unlist'
})

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false)
  const [opened, setOpened] = useState(false)
  const [signIn, setSignIn] = useState(false)

  const { replace } = useRouter()
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (!user) {
      setSignIn(false)
    } else {
      setSignIn(true)
    }
  }, [user])

  const showSidebar = () => {
    setSidebar(!sidebar)
  }

  const signOut = () => {
    supabase.auth.signOut()
    alert(t.messageSignout)
    replace('/')
  }

  // i18n 対応用
  const router = useRouter()
  const { locale } = router
  let t
  if (locale === 'ja-JP') {
    t = ja
  } else {
    t = en
  }

  return (
    <IconContext.Provider value={{ color: '#48bb78' }}>
      <nav>
        {/* PC Nav Menu */}
        <div className={styles.navbarPc}>
          <div className='mx-auto hidden h-16 max-w-5xl items-center justify-between md:flex'>
            <Link href='/'>
              <a className={styles.logoPc}>
                <Image src={logo} alt='logo' width={60} height={60}/>
              </a>
            </Link>
            <div className='mx-5 hidden flex-initial font-bold text-[#abc5c5] md:flex '>
              <ul className='m-0 text-left md:flex'>
                <li className='list-none p-4'>
                  <Link href='/'>
                    <a className='font-bold leading-8 text-green-500 no-underline hover:text-green-200'>
                      Home
                    </a>
                  </Link>
                </li>
                <li className='list-none p-4'>
                  <Link href='/stocks'>
                    <a className='font-bold leading-8 text-green-500 no-underline hover:text-green-200'>
                      {t.stockList}
                    </a>
                  </Link>
                </li>

                {!signIn ? (
                  <>
                    <li className='list-none p-4'>
                      <Link href='/auth/signin'>
                        <a className='font-bold leading-8 text-green-500 no-underline hover:text-green-200'>
                          {t.login}
                        </a>
                      </Link>
                    </li>
                    <li className='list-none p-4'>
                      <Link href='/auth/signup'>
                        <a className='font-bold leading-8 text-green-500 no-underline hover:text-green-200'>
                          {t.signup}
                        </a>
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className='list-none p-4'>
                      <Link href='/member'>
                        <a className='font-bold leading-8 text-green-500 no-underline hover:text-green-200'>
                          {t.member}
                        </a>
                      </Link>
                    </li>
                    <li className='list-none p-4'>
                      <div onClick={signOut}>
                        <a className='font-bold leading-8 text-green-500 no-underline hover:text-green-200'>
                          {t.logout}
                        </a>
                      </div>
                    </li>
                  </>
                )}

                {/* Search Icon and ( Modal )*/}
                <div className='m-0 pt-5 pb-2 px-4 items-center'>
                  <AiOutlineSearch
                    className='cursor-pointer text-3xl'
                    onClick={() => setOpened(true)}
                  />
                </div>
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile Top Menu with Hamburger */}
        <div className={styles.navbarMobile}>
          <div className='flex w-full items-center justify-between pr-6 md:hidden'>
            <div className={styles.menuBars}>
              <FaBars onClick={showSidebar} className='cursor-pointer' />
            </div>
            <Link href='/' passHref>
              <div className='ml-3 cursor-pointer text-2xl font-extrabold text-green-500'>
                <a>TenQ.cc</a>
              </div>
            </Link>
            {/* Search Icon and Modal */}
            <div>
              <p>
                <AiOutlineSearch
                  className='cursor-pointer text-3xl'
                  onClick={() => setOpened(true)}
                />
              </p>
            </div>
            <Modal
              opened={opened}
              onClose={() => setOpened(false)}
              title='Input Ticker or CompanyName'
              centered
              classNames={{
                modal:"bg-yellow-100"
              }}
            >
              <SearchBar
                placeholder='Ticker or Company'
                data={codeListNotUnlist}
                setOpened={setOpened}
              />
            </Modal>
          </div>
        </div>

        {/* Mobile SideMenu */}
        <div className={sidebar ? styles.navMenuActive : styles.navMenu}>
          <ul className={styles.navMenuItems} onClick={showSidebar}>
            <li className={styles.navBarToggle}>
              <Link href='/' passHref>
                <div className={styles.menuBars}>
                  <a>
                    <AiOutlineClose />
                  </a>
                </div>
              </Link>
            </li>

            <li className='list-none'>
              <div className={styles.navText}>
                <Link href='/'>
                  <a>
                    <AiOutlineHome />
                    <span className='ml-2'>Home</span>
                  </a>
                </Link>
              </div>
            </li>

            <li className='list-none'>
              <div className={styles.navText}>
                <Link href='/stocks'>
                  <a>
                    <AiOutlineUnorderedList />
                    <span className='ml-2'>{t.stockList}</span>
                  </a>
                </Link>
              </div>
            </li>

            <li className='list-none'>
              <div className={styles.navText}>
                <Link href='https://twitter.com/Sa10shitoushi' rel='noopener noreferrer'>
                  <a>
                    <AiOutlineTwitter />
                    <span className='ml-2'>Twitter</span>
                  </a>
                </Link>
              </div>
            </li>

            <li className='list-none'>
              <div className={styles.navText}>
                <Link href='https://note.com/satoshi_toushi' rel='noopener noreferrer'>
                  <a>
                    <FaRegStickyNote />
                    <span className='ml-2'>note</span>
                  </a>
                </Link>
              </div>
            </li>

            <li className='list-none'>
              <div className={styles.navText}>
                <Link href='https://medium.com/@tenq' rel='noopener noreferrer'>
                  <a>
                    <AiFillMediumSquare />
                    <span className='ml-2'>medium</span>
                  </a>
                </Link>
              </div>
            </li>

            <li className='list-none'>
              <div className={styles.navText}>
                <Link href='/rules/discraimer'>
                  <a>
                    <IoDocumentTextOutline />
                    <span className='ml-2'>{t.disclaimer}</span>
                  </a>
                </Link>
              </div>
            </li>

            {!signIn ? (
              <li className='list-none'>
                <div className={styles.navText}>
                  <Link href='/auth/signin'>
                    <a>
                      <AiOutlineLogin />
                      <span className='ml-2'>{t.login}</span>
                    </a>
                  </Link>
                </div>
              </li>
            ) : (
              <li className='list-none'>
                <div className={styles.navText}>
                  <div onClick={signOut} className='w-full'>
                    <a>
                      <AiOutlineLogout />
                      <span className='ml-2'>{t.logout}</span>
                    </a>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </IconContext.Provider>
  )
}

export default Navbar
