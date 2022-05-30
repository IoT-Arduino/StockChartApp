import React, { useState } from 'react'
import Image from 'next/image'
import styles from './Navbar.module.css'

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

import Link from 'next/link'
// import { NavSidebarData } from './NavSidebarData'
import { IconContext } from 'react-icons'
import logo from '../public/logo.png'

import { supabase } from '../utils/supabase'
import { useContext } from 'react'
import { UserContext } from '../utils/UserContext'
import { useRouter } from 'next/router'


const NavSidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiOutlineHome />,
    cName: 'navText'
  },
  {
    title: '株式一覧',
    path: '/stocks',
    icon: <AiIcons.AiOutlineUnorderedList />,
    cName: 'navText'
  },
  {
    title: '会員ページ',
    path: '/member',
    icon: <AiIcons.AiOutlineUser />,
    cName: 'navText'
  }
];



const Navbar = () => {
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => {
    setSidebar(!sidebar)
  }

  const { replace } = useRouter()
  const { user } = useContext(UserContext)

   console.log(user)

  const signOut = () => {
    supabase.auth.signOut()
    alert("サインアウトしました")
    console.log(user)
    replace('/')
  }

  return (
    <IconContext.Provider value={{ color: '#48bb78' }}>
    <nav className='mx-auto flex h-16 max-w-7xl items-center justify-between bg-white'>
         {/* PC Nav Menu */}
        <div className='hidden flex-none md:flex md:flex-1 lg:flex-1 xl:flex-1'>
          <Link href='/'>
            <a>
              <Image src={logo} alt='logo' width={75} height={75} />
            </a>
          </Link>
          </div>
          <div className='hidden md:flex m-5 flex-initial font-bold text-[#abc5c5] '>
            <ul className='flex-initial text-left md:flex'>
              {NavSidebarData.map((value, index) => (
                <li key={index} className='p-4'>
                  <a href={value.path}>{value.title} </a>
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
                  <Link href='/' onClick={signOut} >
                    <a className='font-bold'>サインアウト!</a>
                  </Link>
                </li>
              )}
            </ul>
          </div>



        {/* Mobile Top Menu with Hamburger */}
        <div className='md:hidden flex justify-between items-center'>
          <div className={styles.menuBars}>
            <FaIcons.FaBars onClick={showSidebar} />
          </div>
          <Link href="/">
            <div className="ml-2 text-green-500 font-extrabold text-xl ml-3 cursor-pointer">TenQ.cc</div>
          </Link>
        </div>
        {/* Mobile SideMenu */}
        <div className={sidebar ? styles.navMenuActive : styles.navMenu}>
          <ul className={styles.navMenuItems} onClick={showSidebar}>
            <li className={styles.navBarToggle}>
              <Link href='/'>
                <div className={styles.menuBars}>
                  <AiIcons.AiOutlineClose />
                </div>
              </Link>
            </li>
            {NavSidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <div className={styles.navText}>
                    <Link href={item.path}>
                      <a>
                        {item.icon}
                        <span className="ml-2">{item.title}</span>
                      </a>
                    </Link>
                  </div>
                </li>
              )
            })}
            {!user ? (
              <li>
              <div className={styles.navText}>
                <Link href='/signin'>
                  <a><AiIcons.AiOutlineLogin /><span className="ml-2">サインイン</span></a>
                </Link>
                </div>
              </li>
            ) : (
              <li>
              <div className={styles.navText}>
                <div onClick={signOut} className="w-full" >
                  <a><AiIcons.AiOutlineLogout /><span className="ml-2">サインアウト</span></a>
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
