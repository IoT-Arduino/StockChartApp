import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../utils/UserContext'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'

// Components
import Datatable from '../../components/Datatable'

// Types
import { Company } from '../../types/Company'
// JSON data
import { codeList } from '../../data/stockCode/US-StockList'

// i18n
import en from './../../locales/en/en'
import ja from './../../locales/ja/ja'

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

  // i18n 対応用
  const router = useRouter()
  const { locale } = router
  let t
  if (locale === 'ja-JP') {
    t = ja
  } else {
    t = en
  }

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
        title={t.pageTitleStockList}
        description={t.pageDescStockList}
      />

      <main className='mx-auto max-w-5xl'>
        <h2 className='my-8 text-2xl'>{t.stock500List}</h2>
        <div className='my-4 flex w-full items-center sm:justify-end'>
          <input
            className='rounded border border-black p-2 sm:w-1/4'
            type='text'
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <p className='ml-2'>{t.searchStockList}</p>
        </div>

        <div className='relative my-4 overflow-x-auto shadow-md sm:rounded-lg'>
          <Datatable data={search(codeListNotUnlist as any)} />
        </div>
      </main>
    </>
  )
}

export default StockIndex
