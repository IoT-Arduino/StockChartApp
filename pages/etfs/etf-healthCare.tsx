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
    <main className="max-w-5xl mx-auto mt-6 mb-20">
      <div className='mx-2 mt-8'>
        <p className='text-bold text-2xl'>{fundsData.vhtData.meta.symbol}</p>
        <EtfCandleChart etfData={fundsData.vhtData} />
        <div className='mx-auto md:w-4/5'>
          <p>
            VVHTはアメリカの資産運用会社・バンガード社が提供するETFで、「医薬品や医療機器などを含むヘルスケアセクターの企業（約450社）」を投資対象とするETFです。
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
                <Link href='/stocks/PFE'>
                <a className="text-green-600 hover:text-green-200">ファイザー</a>
              </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                <Link href='/stocks/ABBV'>
                <a className="text-green-600 hover:text-green-200">アッヴィ</a>
              </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                <Link href='/stocks/LLY'>
                <a className="text-green-600 hover:text-green-200">イーライリリー</a>
              </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                <Link href='/stocks/TMO'>
                <a className="text-green-600 hover:text-green-200">サーモ・フィッシャー・サイエンティフィック</a>
              </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                <Link href='/stocks/ABT'>
                <a className="text-green-600 hover:text-green-200">アボットラボラトリーズ</a>
              </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                <Link href='/stocks/BMY'>
                <a className="text-green-600 hover:text-green-200">ブリストル・マイヤーズスクイブ</a>
              </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                <Link href='/stocks/DHR'>
                <a className="text-green-600 hover:text-green-200">ダナハー</a>
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
