import Link from 'next/link';
import Image from 'next/image';
import { data } from 'autoprefixer';
import React, { useState } from 'react';
import logo from "../public/logo.png";
import menu from "../public/menu-hamg.png";

export default function HeaderNav(props) {
  const [openMenu, setOpenMenu] = useState(false);
  // console.log(openMenu);
  const data = props.list;
  // console.log(data);

  const menuFunction = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <nav className='flex'>
      <div className='flex-none  sm:flex-1 md:flex-1 lg:flex-1 xl:flex-1'>
        <Link href='/'>
          <a>
            <Image src={logo} alt='logo' width={75} height={75} />
          </a>
        </Link>
      </div>
      {openMenu ? (
        <div className='flex flex-row absolute z-10 top-0 right-0  min-h-fit min-w-full'>
          <div className='basis-1/2'></div>

          <div className='basis-1/2 bg-white'>
            <ul className=' text-center border-l-2 '>
              <li className='p-2 border-b-2'>
                <button onClick={menuFunction} className='font-bold'>
                  close
                </button>
              </li>
              {data.map((value, index) => (
                <li key={index} className='p-2 border-b-2'>
                  <a href={value.link} onClick={menuFunction}>
                    {value.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : undefined}
      <div className='flex-initial text-[#abc5c5] font-bold m-5 '>
        <ul className='md:flex  hidden flex-initial text-left'>
          {data.map((value, index) => (
            <li key={index} className='p-4'>
              <a href={value.link}>{value.name} </a>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={menuFunction} className='flex-initial absolute top-0 right-0 md:hidden'>
        <Image src={menu} alt='menu' width={50} height={50} />
      </button>
    </nav>
  );
}
