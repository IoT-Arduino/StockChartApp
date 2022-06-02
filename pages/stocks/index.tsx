import React, { useState } from 'react'
import Link from 'next/link'
// import styles from "../../styles/Home.module.css";

import { useContext } from 'react'
import { UserContext } from '../../utils/UserContext'
import { NextPage } from 'next'

import { NextSeo } from 'next-seo'
import Datatable from '../../components/Datatable'

import { Company } from '../../types/Company'
 
export async function getServerSideProps() {
  try {
    const reqList = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDOPOINT}/stockCode/US-StockList.json`
    )
    const codeList = await reqList.json()

    const codeListSorted = codeList.sort(function (a: any, b: any) {
      if (a.Ticker > b.Ticker) {
        return 1
      } else {
        return -1
      }
    })

    return {
      props: {
        codeList: codeListSorted,
      },
    }
  } catch (err) {
    console.log(err)
  }
}

const StockIndex: NextPage<{ codeList: Company[] }> = ({ codeList }) => {
  const { user, session } = useContext(UserContext)

  const [data, setData] = useState([])
  const [q, setQ] = useState('')

  const codeListSP = codeList.filter((item) => {
    return item.SP500 == 'SP500' && item.Unlist != 'unlist'
  })

  const codeUnlist = codeList.filter((item) => {
    return item.Unlist == 'unlist'
  })

  const codeListNSP = codeList.filter((item) => {
    return item.SP500 != 'SP500'
  })

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
          <Datatable data={search(codeList)} />
        </div>
        {user ? (
          <div>
            <h2 className='my-6'>Unlist株式一覧</h2>
            <ul>
              {codeUnlist.map((code, i) => {
                return (
                  <li key={i}>
                    <Link href={`/stocks/${code.Ticker}`}>
                      <a>
                        {code.Name}/{code.Ticker}/{code.CIK}
                      </a>
                    </Link>
                  </li>
                )
              })}
            </ul>

            <h2 className='my-6'>Not500株式一覧</h2>
            <ul>
              {codeListNSP.map((code, i) => {
                return (
                  <li key={i}>
                    <Link href={`/stocks/${code.Ticker}`}>
                      <a>
                        {code.Name}/{code.Ticker}/{code.CIK}
                      </a>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ) : null}
      </main>
    </>
  )
}

export default StockIndex
