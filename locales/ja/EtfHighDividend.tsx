import React from 'react'
import Link from 'next/link'
import EtfCandleChart from './../../components/EtfCandleChart'

// Types
import { FundsData } from './../../types/FundsData'

const EtfHighDividend = ({ fundsData }:FundsData) => {
  return (
    <div>
      <div className='mx-2 mt-8'>
        <p className='text-bold text-2xl'>VIG</p>
        <EtfCandleChart etfData={fundsData.vigData} />
        <div className='mx-auto md:w-4/5'>
          <p>
            VIGの説明：、10年以上連続で一貫して増配する方針がとられている米国株（約250銘柄）を投資対象とするETFです（REITを除く）。
          </p>
          <p className='text-bold mt-3 mb-2 text-xl'>上位構成銘柄</p>

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
                  <Link href='/stocks/MSFT'>
                    <a className='text-green-600 hover:text-green-200'>MSFT:マイクロソフト</a>
                  </Link>
                </td>
              </tr>

              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/UNH'>
                    <a className='text-green-600 hover:text-green-200'>
                      UNH:ユナイテッドヘルス・グループ
                    </a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/JNJ'>
                    <a className='text-green-600 hover:text-green-200'>
                      JNJ:ジョンソン・エンド・ジョンソン(J&J)
                    </a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/JPM'>
                    <a className='text-green-600 hover:text-green-200'>
                      JPモルガン・チェース・アンド・カンパニー
                    </a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/PG'>
                    <a className='text-green-600 hover:text-green-200'>
                      PG:プロクター・アンド・ギャンブル(P&G)
                    </a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/V'>
                    <a className='text-green-600 hover:text-green-200'>V:ビザ</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/HD'>
                    <a className='text-green-600 hover:text-green-200'>HD:ホーム・デポ</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/MA'>
                    <a className='text-green-600 hover:text-green-200'>MA:マスターカード</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/AVGO'>
                    <a className='text-green-600 hover:text-green-200'>AVGO:ブロードコム</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/COST'>
                    <a className='text-green-600 hover:text-green-200'>COST:コストコホールセール</a>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className='mx-2 mt-8'>
        <p className='text-bold text-2xl'>VYM</p>
        <EtfCandleChart etfData={fundsData.vymData} />
        <div className='mx-auto md:w-4/5'>
          <p>
            VYMの説明：全米国銘柄の中から大型株を中心に予想配当利回りが市場平均を上回る銘柄で構成されています。（FTSEハイデ
            ィビデンド・イールド指数に連動します）
          </p>
          <p className='text-bold mt-3 mb-2 text-xl'>上位構成銘柄</p>

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
                  <Link href='/stocks/JNJ'>
                    <a className='text-green-600 hover:text-green-200'>
                      JNJ:ジョンソン・エンド・ジョンソン(J&J)
                    </a>
                  </Link>
                </td>
              </tr>

              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/JPM'>
                    <a className='text-green-600 hover:text-green-200'>
                      JPモルガン・チェース・アンド・カンパニー
                    </a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/PG'>
                    <a className='text-green-600 hover:text-green-200'>
                      PG:プロクター・アンド・ギャンブル(P&G)
                    </a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/XOM'>
                    <a className='text-green-600 hover:text-green-200'>XOM:エクソンモービル</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/CVX'>
                    <a className='text-green-600 hover:text-green-200'>CVX:シェブロン</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/HD'>
                    <a className='text-green-600 hover:text-green-200'>HD:ホームデポ</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/BAC'>
                    <a className='text-green-600 hover:text-green-200'>
                      BAC:バンク・オブ・アメリカ
                    </a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/PFE'>
                    <a className='text-green-600 hover:text-green-200'>PFE:ファイザー</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/ABBV'>
                    <a className='text-green-600 hover:text-green-200'>ABBV:アッヴィ</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/AVGO'>
                    <a className='text-green-600 hover:text-green-200'>AVGO:ブロードコム</a>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default EtfHighDividend
