import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import styles from './LayoutWrapper.module.css'

type Props = {
  children: ReactNode
}

export const LayoutWrapper = (props: Props) => {
  return (
    <>
      <div className='flex min-h-screen flex-col'>
        <Navbar />
        <div className='flex-1 px-2 py-16 text-gray-600 sm:px-4'>
          <div>{props.children}</div>
        </div>
        <div className={styles.footer}>
          <div className='mt-auto flex-none'>
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}
