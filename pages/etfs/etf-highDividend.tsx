import { useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import EtfCandleChart from './../../components/EtfCandleChart'

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
    <main className="max-w-5xl mx-auto mt-6 mb-20">
      <div className='mx-2 mt-8'>
        <p className='text-bold text-2xl'>{fundsData.vigData.meta.symbol}</p>
        <EtfCandleChart etfData={fundsData.vigData} />
        <div className='mx-auto md:w-4/5'>
          <p>
            VIGの説明：、10年以上連続で一貫して増配する方針がとられている米国株（約250銘柄）を投資対象とするETFです（REITを除く）。
          </p>
          <p className='text-bold mt-3 mb-2 text-xl'>上位構成銘柄</p>

          <table className='w-full sm:w-1/2 text-center text-sm text-gray-500 dark:text-gray-400 mx-auto'>
            <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-4 py-2'>
                  銘柄
                </th>
              </tr>
            </thead>
            <tbody>

              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/MSFT'>
                    <a className="text-green-600 hover:text-green-200">MSFT:マイクロソフト</a>
                  </Link>
                </td>
              </tr>



              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                <Link href='/stocks/UNH'>
                <a className="text-green-600 hover:text-green-200">UNH:ユナイテッドヘルス・グループ</a>
              </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                <Link href='/stocks/JNJ'>
                <a className="text-green-600 hover:text-green-200">JNJ:ジョンソン・エンド・ジョンソン(J&J)</a>
              </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                <Link href='/stocks/JPM'>
                <a className="text-green-600 hover:text-green-200">JPモルガン・チェース・アンド・カンパニー</a>
              </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                <Link href='/stocks/PG'>
                <a className="text-green-600 hover:text-green-200">PG:プロクター・アンド・ギャンブル(P&G)</a>
              </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                <Link href='/stocks/V'>
                <a className="text-green-600 hover:text-green-200">V:ビザ</a>
              </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                <Link href='/stocks/HD'>
                <a className="text-green-600 hover:text-green-200">HD:ホーム・デポ</a>
              </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                <Link href='/stocks/MA'>
                <a className="text-green-600 hover:text-green-200">MA:マスターカード</a>
              </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                <Link href='/stocks/AVGO'>
                <a className="text-green-600 hover:text-green-200">AVGO:ブロードコム</a>
              </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                <Link href='/stocks/COST'>
                <a className="text-green-600 hover:text-green-200">COST:コストコホールセール</a>
              </Link>
                </td>
              </tr>
            </tbody>
          </table>

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


          <table className='w-full sm:w-1/2 text-center text-sm text-gray-500 dark:text-gray-400 mx-auto'>
            <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-4 py-2'>
                  銘柄
                </th>
              </tr>
            </thead>
            <tbody>

              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                <Link href='/stocks/JNJ'>
                <a className="text-green-600 hover:text-green-200">JNJ:ジョンソン・エンド・ジョンソン(J&J)</a>
              </Link>
                </td>
              </tr>

              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                <Link href='/stocks/JPM'>
                <a className="text-green-600 hover:text-green-200">JPモルガン・チェース・アンド・カンパニー</a>
              </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                <Link href='/stocks/PG'>
                <a className="text-green-600 hover:text-green-200">PG:プロクター・アンド・ギャンブル(P&G)</a>
              </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                <Link href='/stocks/XOM'>
                <a className="text-green-600 hover:text-green-200">XOM:エクソンモービル</a>
              </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                <Link href='/stocks/CVX'>
                <a className="text-green-600 hover:text-green-200">CVX:シェブロン</a>
              </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                <Link href='/stocks/HD'>
                <a className="text-green-600 hover:text-green-200">HD:ホームデポ</a>
              </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                <Link href='/stocks/BAC'>
                <a className="text-green-600 hover:text-green-200">BAC:バンク・オブ・アメリカ</a>
              </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                <Link href='/stocks/PFE'>
                <a className="text-green-600 hover:text-green-200">PFE:ファイザー</a>
              </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                <Link href='/stocks/ABBV'>
                <a className="text-green-600 hover:text-green-200">ABBV:アッヴィ</a>
              </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                <Link href='/stocks/AVGO'>
                <a className="text-green-600 hover:text-green-200">AVGO:ブロードコム</a>
              </Link>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </main>
  )
}

export default Home
