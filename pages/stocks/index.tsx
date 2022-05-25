import React, { useState, useEffect } from 'react'
import Link from 'next/link'
// import styles from "../../styles/Home.module.css";

import { useContext } from 'react'
import { UserContext } from '../../utils/UserContext'
import { NextPage } from 'next'

import { NextSeo } from 'next-seo'
import Datatable from '../../components/Datatable'

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

type PropsCode = {
  ADR?: string
  CIK?: number
  Country?: string
  IPOYear?: number
  Industry?: string
  Market?: string
  Name: string
  SP500?: string
  Sector?: string
  Ticker: string
  Unlist?: string
}

const StockIndex: NextPage<{ codeList: PropsCode[] }> = ({ codeList }) => {
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

  const codeListFin = codeList.filter((item) => {
    return item.Sector == 'Finance'
  })

  const search = (rows: PropsCode[]) => {
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
        description='米国主要株500社一覧ページ、リンクをクリックすると、株価と業績の合成チャートが確認できます。'
      />

      <main className="max-w-5xl mx-auto">
        <h2>米国代表500株式一覧</h2>
        <div>
          <input type='text' value={q} onChange={(e) => setQ(e.target.value)} />
          <small>TICKER名称、会社名称で検索できます。</small>
        </div>

        <div >

        <Datatable data={search(codeList)} />

        </div>


          {user ? (
            <div>
              <h2 className="my-6">Unlist株式一覧</h2>
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

              <h2 className="my-6">Not500株式一覧</h2>
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
          ) : (
            null
          )}

      </main>
    </>
  )
}

export default StockIndex
