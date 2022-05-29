import { useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import EtfCandleChart from './../components/EtfCandleChart'

export async function getServerSideProps() {
  try {
    const p1 = 1420038000 // 2015/01/01
    const p2 = 9999999999
    const range = '5d' // week "5d" , month "1mo"

    const symbols = ['VHT']

    const etfResponse = symbols.map(async (symbol) => {
      let reqList = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/?symbol=${symbol}&period1=${p1}&period2=${p2}&interval=${range}`
      )
      const etfPriceList = await reqList.json()
      return etfPriceList.chart.result[0]
    })
    const etfResponseData = await Promise.all(etfResponse)

    return {
      props: {
        fundsData: {
          vhtData: etfResponseData[0]
        },
      },
    }
  } catch (err) {
    console.log(err)
  }
}

const Home: NextPage = ({ fundsData }: any) => {
  
  return (
    <main>
      <div className='mx-2 mt-8'>
        <p className='text-bold text-2xl'>{fundsData.vhtData.meta.symbol}</p>
        <EtfCandleChart etfData={fundsData.vhtData} />
        <div className='mx-auto md:w-4/5'>
          <p>
            VVHTはアメリカの資産運用会社・バンガード社が提供するETFで、「医薬品や医療機器などを含むヘルスケアセクターの企業（約450社）」を投資対象とするETFです。
          </p>
          <p className='text-bold mt-3 mb-2 text-xl'>上位構成銘柄</p>
          <ul>
          <li>
              <Link href='/stocks/UNH'>
                <a>UNH:ユナイテッドヘルス・グループ</a>
              </Link>
            </li>
            <li>
              <Link href='/stocks/JNJ'>
                <a>JNJ:ジョンソン・エンド・ジョンソン(J&J)</a>
              </Link>
            </li>

            <li>
              <Link href='/stocks/PFE'>
                <a>ファイザー</a>
              </Link>
            </li>
            <li>
              <Link href='/stocks/ABBV'>
                <a>アッヴィ</a>
              </Link>
            </li>
            <li>
              <Link href='/stocks/LLY'>
                <a>イーライリリー</a>
              </Link>
            </li>
            <li>
              <Link href='/stocks/TMO'>
                <a>サーモ・フィッシャー・サイエンティフィック</a>
              </Link>
            </li>
            <li>
              <Link href='/stocks/ABT'>
                <a>アボットラボラトリーズ</a>
              </Link>
            </li>
            <li>
              <Link href='/stocks/BMY'>
                <a>ブリストル・マイヤーズスクイブ</a>
              </Link>
            </li>
            <li>
              <Link href='/stocks/DHR'>
                <a>ダナハー</a>
              </Link>
            </li>

          </ul>
        </div>
      </div>

    </main>
  )
}

export default Home
