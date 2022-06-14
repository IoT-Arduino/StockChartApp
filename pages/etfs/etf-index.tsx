// import { useEffect } from 'react'
import type { NextPage } from 'next'
// import Head from 'next/head'
// import Image from 'next/image'
import Link from 'next/link'
import styles from './../../styles/Home.module.css'
import EtfCandleChart from './../../components/EtfCandleChart'
import EtfCompareLineChart from './../../components/EtfCompareLineChart'

export async function getServerSideProps() {
  try {
    const p1 = 1420038000 // 2015/01/01
    const p2 = 9999999999
    const range = '5d' // week "5d" , month "1mo"

    const symbols = ['VOO', 'VTI', 'VT', 'VWO']

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
          vooData: etfResponseData[0],
          vtiData: etfResponseData[1],
          vtData: etfResponseData[2],
          vwoData: etfResponseData[3],
        },
      },
    }
  } catch (err) {
    console.log(err)
  }
}

const Home: NextPage = ({ fundsData }: any) => {
  return (
    <main className='mx-auto mt-6 mb-20 max-w-5xl'>
      <h2 className={styles.title}>米国主要ETF比較</h2>
      <div>米国主要インデックスETF（Vanguard系の比較、2014年末を起点とした成長率）</div>

      <div className='mx-2 mt-8'>
        <p className='text-bold text-2xl'>VOO,VTI,VT</p>
        <EtfCompareLineChart fundsData={fundsData} />
        <div className='mx-auto md:w-4/5'>
          <p>VOOの説明（赤線）：S&P500インデックス指数に連動したETF</p>
          <p>
            VTIの説明（緑線）：中小型株を含めた米国市場の約4,000銘柄をカバーしているETF。厚切りジェイソンさんが著書「ジェイソン流お金の増やし方」でおすすめしている。
          </p>
          <p>
            VTの説明（青線）：先進国と新興国市場の両方を対象とし、米国内外の株式で構成されるETF。「ほったらかし投資術」で推奨されている。
          </p>
          <p className='text-bold mt-3 mb-2 text-xl'>上位構成銘柄（VOO,VTI,VT共通）</p>

          <table className='mx-auto w-full text-center text-sm text-gray-500 dark:text-gray-400 sm:w-1/2'>
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
                  <Link href='/stocks/AAPL'>
                    <a className='text-green-600 hover:text-green-200'>AAPL:アップル</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/MSFT'>
                    <a className='text-green-600 hover:text-green-200'>MSFT:マイクロソフト</a>
                  </Link>
                </td>
              </tr>

              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/AMZN'>
                    <a className='text-green-600 hover:text-green-200'>AMZN:アマゾン</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/GOOGL'>
                    <a className='text-green-600 hover:text-green-200'>GOOGL:アルファベット</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/TSLA'>
                    <a className='text-green-600 hover:text-green-200'>TSLA:テスラ</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/FB'>
                    <a className='text-green-600 hover:text-green-200'>FB:メタ</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/NVDA'>
                    <a className='text-green-600 hover:text-green-200'>NVDA:エヌビディア</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/BRK-B'>
                    <a className='text-green-600 hover:text-green-200'>
                      BRKB:バークシャーハサウェイ
                    </a>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className='mx-2 mt-8'>
        <p className='text-bold text-2xl'>{fundsData.vwoData.meta.symbol}</p>
        <EtfCandleChart etfData={fundsData.vwoData} />
        <div className='mx-auto md:w-4/5'>
          <p>
            VWOの説明：FTSEエマージング・マーケッツ・インデックスに連動する投資成果を目指す。ブラジル、ロシア、インド、台湾、中国、南アフリカなど、世界中の新興国市場で大型・中型株を保有するETF
          </p>
          　<p className='text-bold mt-3 mb-2 text-xl'>上位構成銘柄</p>
          <table className='mx-auto w-full text-center text-sm text-gray-500 dark:text-gray-400 sm:w-3/5'>
            <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-4 py-2'>
                  銘柄
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>2330:TT(TSM:US)/台湾積体電路製造 [TSMC/台湾セ]</td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>700:HK/騰訊控股[テンセント・ホールディングス]</td>
              </tr>

              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>9988:HK/アリババグループ・ホールディング</td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>RIL:IN/リライアンス・インダストリーズ</td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>INFO:IN/インフォシス</td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>VALE3:BZ/ヴァーレ</td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>3690:HK/美団[メイトゥアン]</td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <a>939:HK/中国建設銀行 [チャイナ・コンストラクション]</a>
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
