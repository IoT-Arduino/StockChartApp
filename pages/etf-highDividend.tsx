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

    const symbols = ['VIG', 'VYM']

    const etfResponse = symbols.map(async (symbol) => {
      let reqList = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/?symbol=${symbol}&period1=${p1}&period2=${p2}&interval=${range}`
      )
      const etfPriceList = await reqList.json()
      return etfPriceList.chart.result[0]
    })
    const etfResponseData = await Promise.all(etfResponse)

    // console.log(etfResponseData[3].meta)
    // console.log(etfResponseData[4].meta)
    // console.log(etfResponseData[5].meta)
    // console.log(priceList.chart.result[0].indicators.adjclose)

    return {
      props: {
        fundsData: {
          vigData: etfResponseData[0],
          vymData: etfResponseData[1],
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
        <p className='text-bold text-2xl'>{fundsData.vigData.meta.symbol}</p>
        <EtfCandleChart etfData={fundsData.vigData} />
        <div className='mx-auto md:w-4/5'>
          <p>
            VIGの説明：、10年以上連続で一貫して増配する方針がとられている米国株（約250銘柄）を投資対象とするETFです（REITを除く）。
          </p>
          <p className='text-bold mt-3 mb-2 text-xl'>上位構成銘柄</p>
          <ul>
            <li>
              <Link href='/stocks/MSFT'>
                <a>MSFT:マイクロソフト</a>
              </Link>
            </li>
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
              <Link href='/stocks/JPM'>
                <a>JPモルガン・チェース・アンド・カンパニー</a>
              </Link>
            </li>
            <li>
              <Link href='/stocks/PG'>
                <a>PG:プロクター・アンド・ギャンブル(P&G)</a>
              </Link>
            </li>
            <li>
              <Link href='/stocks/V'>
                <a>V:ビザ</a>
              </Link>
            </li>
            <li>
              <Link href='/stocks/HD'>
                <a>HD:ホーム・デポ</a>
              </Link>
            </li>
            <li>
              <Link href='/stocks/MA'>
                <a>MA:マスターカード</a>
              </Link>
            </li>
            <li>
              <Link href='/stocks/AVGO'>
                <a>AVGO:ブロードコム</a>
              </Link>
            </li>
            <li>
              <Link href='/stocks/COST'>
                <a>COST:コストコホールセール</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className='mx-2 mt-8'>
        <p className='text-bold text-2xl'>{fundsData.vymData.meta.symbol}</p>
        <EtfCandleChart etfData={fundsData.vymData} />
        <div className='mx-auto md:w-4/5'>
          <p>
            VYMの説明：全米国銘柄の中から大型株を中心に予想配当利回りが市場平均を上回る銘柄で構成されています。（FTSEハイデ
            ィビデンド・イールド指数に連動します）
          </p>
          <p className='text-bold mt-3 mb-2 text-xl'>上位構成銘柄</p>
          <ul>
            <li>
              <Link href='/stocks/JNJ'>
                <a>JNJ:ジョンソン・エンド・ジョンソン(J&J)</a>
              </Link>
            </li>
            <li>
              <Link href='/stocks/JPM'>
                <a>JPモルガン・チェース・アンド・カンパニー</a>
              </Link>
            </li>
            <li>
              <Link href='/stocks/PG'>
                <a>PG:プロクター・アンド・ギャンブル(P&G)</a>
              </Link>
            </li>
            <li>
              <Link href='/stocks/XOM'>
                <a>XOM:エクソンモービル</a>
              </Link>
            </li>
            <li>
              <Link href='/stocks/CVX'>
                <a>CVX:シェブロン</a>
              </Link>
            </li>
            <li>
              <Link href='/stocks/HD'>
                <a>HD:ホームデポ</a>
              </Link>
            </li>
            <li>
              <Link href='/stocks/BAC'>
                <a>BAC:バンク・オブ・アメリカ</a>
              </Link>
            </li>
            <li>
              <Link href='/stocks/PFE'>
                <a>PFE:ファイザー</a>
              </Link>
            </li>
            <li>
              <Link href='/stocks/ABBV'>
                <a>ABBV:アッヴィ</a>
              </Link>
            </li>
            <li>
              <Link href='/stocks/AVGO'>
                <a>AVGO:ブロードコム</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}

export default Home
