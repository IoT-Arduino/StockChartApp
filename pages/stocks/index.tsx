import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../utils/UserContext'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

// fs
// import fsPromises from 'fs/promises';
// import path from 'path'

// Components
import Datatable from '../../components/Datatable'

// Types
import { Company } from '../../types/Company'
// JSON data
import {codeList} from '../../data/stockCode/US-StockList'

 
const StockIndex: NextPage = () => {
  const { user, session } = useContext(UserContext)
  const [data, setData] = useState([])
  const [q, setQ] = useState('')
  const [signIn, setSignIn] = useState(false)

  useEffect(() => {
    if (!user) {
      setSignIn(false)
    } else {
      setSignIn(true)
    }
  }, [user])

  // 他に使用されている箇所、全体Index,StockIndex,Navbar
  const codeListNotUnlist = codeList.filter((item) => {
    return item.Unlist != 'unlist'
  })
  
  // const codeUnlist = codeList.filter((item) => {
  //   return item.Unlist == 'unlist'
  // })
  
  // 以下使用していない。
  // const codeListSP = codeList.filter((item) => {
  //   return item.SP500 == 'SP500' && item.Unlist != 'unlist'
  // })
  // const codeListNSP = codeList.filter((item) => {
  //   return item.SP500 != 'SP500'
  // })


  const search = (rows: Company[]) => {
    return rows.filter(
      (row) =>
        row.Ticker.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        row.Name.toLowerCase().indexOf(q.toLowerCase()) > -1
    )
  }

  return (
    <>
      <NextSeo
        title='米国主要株500社一覧ページ'
        description='米国主要株500社一覧ページ、リンクをクリックすると、株価と四半期決算業績の合成チャートが確認できます。'
      />

      <main className='mx-auto max-w-5xl'>
        <h2 className='my-8 text-2xl'>米国代表500株式一覧</h2>
        <div className='my-4 flex w-full items-center sm:justify-end'>
          <input
            className='sm:w-1/4 rounded border border-black p-2'
            type='text'
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <p className='ml-2'>TICKER名称、会社名称で検索。</p>
        </div>

        <div className='relative my-4 overflow-x-auto shadow-md sm:rounded-lg'>
          <Datatable data={search(codeListNotUnlist as any)} />
        </div>
      </main>
    </>
  )
}

export default StockIndex
