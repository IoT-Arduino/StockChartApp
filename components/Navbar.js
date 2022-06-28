import React, { useState, useEffect } from 'react'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

// Style & Images
import styles from './Navbar.module.css'
import { IconContext } from 'react-icons'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import {IoDocumentTextOutline} from 'react-icons/io5'
import logo from '../public/logo.png'
import { Modal } from '@mantine/core'

// Supabase
import { supabase } from '../utils/supabase'
import { UserContext } from '../utils/UserContext'

// Components
import SearchBar from './HeroSearchBar'

// JSON Data
import { codeList } from '../data/stockCode/US-StockList'

// 他に使用されている箇所、全体Index,StockIndex,Navbar
const codeListNotUnlist = codeList.filter((item) => {
  return item.Unlist != 'unlist'
})

const NavSidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiOutlineHome />,
    cName: 'navText',
  },
  {
    title: '株式一覧',
    path: '/stocks',
    icon: <AiIcons.AiOutlineUnorderedList />,
    cName: 'navText',
  }
]


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
    alert('サインアウトしました')
    replace('/')
  }

  return (
    <IconContext.Provider value={{ color: '#48bb78' }}>
      <nav>
        {/* PC Nav Menu */}
        <div className={styles.navbar}>
          <div className='mx-auto hidden h-16 max-w-5xl items-center justify-between md:flex'>
            <Link href='/'>
              <a>
                <Image src={logo} alt='logo' width={75} height={75} />
              </a>
            </Link>
            <div className='m-5 hidden flex-initial font-bold text-[#abc5c5] md:flex '>
              <ul className='text-left md:flex'>
                {NavSidebarData.map((value, index) => (
                  <li key={index} className='list-none p-4'>
                    <a
                      href={value.path}
                      className='text-green-500 no-underline hover:text-green-200'
                    >
                      {value.title}{' '}
                    </a>
                  </li>
                ))}

                {!signIn ? (
                  <>
                  <li className='list-none p-4'>
                    <Link href='/auth/signin'>
                      <a className='font-bold text-green-500 no-underline hover:text-green-200'>
                        ログイン
                      </a>
                    </Link>
                  </li>
                  <li className='list-none p-4'>
                  <Link href='/auth/signup'>
                    <a className='font-bold text-green-500 no-underline hover:text-green-200'>
                      会員登録
                    </a>
                  </Link>
                </li>
                  </>
                ) : (
                  <>
                  <li className='list-none p-4'>
                  <Link href='/member'>
                    <a className='font-bold text-green-500 no-underline hover:text-green-200'>
                      会員ページ
                    </a>
                  </Link>
                </li>
                  <li className='list-none p-4'>
                    <div onClick={signOut}>
                      <a className='font-bold text-green-500 no-underline hover:text-green-200'>
                        ログアウト
                      </a>
                    </div>
                  </li>
                  </>
                )}

                {/* Search Icon and ( Modal )*/}
                <div>
                  <p>
                    <AiIcons.AiOutlineSearch
                      className='cursor-pointer text-3xl'
                      onClick={() => setOpened(true)}
                    />
                  </p>
                </div>
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile Top Menu with Hamburger */}
        <div className={styles.navbar}>
          <div className='flex w-full items-center justify-between pr-6 md:hidden'>
            <div className={styles.menuBars}>
              <FaIcons.FaBars onClick={showSidebar} className='cursor-pointer' />
            </div>
            <Link href='/' passHref>
              <div className='ml-3 cursor-pointer text-2xl font-extrabold text-green-500'>
                <a>TenQ.cc</a>
              </div>
            </Link>
            {/* Search Icon and Modal */}
            <div>
              <p>
                <AiIcons.AiOutlineSearch
                  className='cursor-pointer text-3xl'
                  onClick={() => setOpened(true)}
                />
              </p>
            </div>
            <Modal
              opened={opened}
              onClose={() => setOpened(false)}
              title='Input Ticker or CompanyName'
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
                    <AiIcons.AiOutlineClose />
                  </a>
                </div>
              </Link>
            </li>
            {NavSidebarData.map((item, index) => {
              return (
                <li key={index} className={styles.navListItem}>
                  <div className={styles.navText}>
                    <Link href={item.path}>
                      <a>
                        {item.icon}
                        <span className='ml-2'>{item.title}</span>
                      </a>
                    </Link>
                  </div>
                </li>
              )
            })}

            <li className='list-none'>
            <div className={styles.navText}>
              <Link href='/rules/discraimer'>
                <a>
                  <IoDocumentTextOutline />
                  <span className='ml-2'>免責事項</span>
                </a>
              </Link>
            </div>
          </li>

            {!signIn ? (
              <li className='list-none'>
                <div className={styles.navText}>
                  <Link href='/auth/signin'>
                    <a>
                      <AiIcons.AiOutlineLogin />
                      <span className='ml-2'>サインイン</span>
                    </a>
                  </Link>
                </div>
              </li>
            ) : (
              <li className='list-none'>
                <div className={styles.navText}>
                  <div onClick={signOut} className='w-full'>
                    <a>
                      <AiIcons.AiOutlineLogout />
                      <span className='ml-2'>サインアウト</span>
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
