import type { ReactNode } from 'react'
import { Footer } from './footer'
import { HeaderNav } from './x-headerNav'
import Navbar from './Navbar'

type Props = {
  children: ReactNode
}

export const LayoutWrapper = (props: Props) => {
  return (
    <>
      <div className='min-h-screen flex flex-col'>
        <Navbar />
        <div className='flex-1 px-4 text-gray-600'>
          <div>{props.children}</div>
        </div>
        <div className='flex-none mt-auto'>
          <Footer />
        </div>
      </div>
    </>
  )
}
