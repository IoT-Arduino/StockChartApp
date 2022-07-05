import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useContext } from 'react'
import { UserContext } from '../../utils/UserContext'
import { NextPage } from 'next'

// Types
import { Company } from '../../types/Company'
// JSON data
import { codeList } from '../../data/stockCode/US-StockList'

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

  const codeUnlist = codeList.filter((item) => {
    return item.Unlist == 'unlist'
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
      <main className='mx-auto max-w-5xl'>
        {signIn ? (
          <div>
            <h2 className='my-6'>Unlist株式一覧</h2>
            <ul>
              {codeUnlist.map((code, i) => {
                return (
                  <li key={i}>
                    <Link href={`/stocks/${code.Ticker}`} prefetch={false}>
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
