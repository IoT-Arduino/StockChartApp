import type { ReactNode } from 'react'
import { Footer } from './footer'
import Navbar from './Navbar'
import styles from './LayoutWrapper.module.css'

type Props = {
  children: ReactNode
}

export const LayoutWrapper = (props: Props) => {
  return (
    <>
      <div className='flex min-h-screen flex-col'>
        <Navbar />
        <div className='flex-1 px-4 pt-16 pb-16 text-gray-600'>
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
