import React from 'react'
import Link from 'next/link'
import EtfCandleChart from './../../components/EtfCandleChart'

const EtfHighDividend = ({ fundsData }) => {
  return (
    <div>
      <div className='mx-2 mt-8'>
        <p className='text-bold text-2xl'>{fundsData.vigData.meta.symbol}</p>
        <EtfCandleChart etfData={fundsData.vigData} />
        <div className='mx-auto md:w-4/5'>
          <p>
            VIG : This ETF invests in U.S. stocks (approximately 250 stocks) whose policy is to
            consistently increase dividends for more than 10 consecutive years (excluding REITs).
          </p>
          <p className='text-bold mt-3 mb-2 text-xl'>Top component stocks</p>

          <table className='mx-auto w-full text-center text-sm text-gray-500 dark:text-gray-400 sm:w-1/2'>
            <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-4 py-2'>
                  Ticker and Company Name
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/MSFT'>
                    <a className='text-green-600 hover:text-green-200'>MSFT:Microsoft</a>
                  </Link>
                </td>
              </tr>

              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/UNH'>
                    <a className='text-green-600 hover:text-green-200'>UNH:UnitedHealth Group</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/JNJ'>
                    <a className='text-green-600 hover:text-green-200'>
                      JNJ:Johnson & Johnson(J&J)
                    </a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/JPM'>
                    <a className='text-green-600 hover:text-green-200'>JPM:JP Morgan Chase & Co.</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/PG'>
                    <a className='text-green-600 hover:text-green-200'>PG:Procter & Gamble(P&G)</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/V'>
                    <a className='text-green-600 hover:text-green-200'>V:Visa</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/HD'>
                    <a className='text-green-600 hover:text-green-200'>HD:Home Depot</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/MA'>
                    <a className='text-green-600 hover:text-green-200'>MA:Mastercard</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/AVGO'>
                    <a className='text-green-600 hover:text-green-200'>AVGO:Broadcom</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/COST'>
                    <a className='text-green-600 hover:text-green-200'>COST:Costco Wholesale</a>
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
            It is composed of stocks with expected dividend yields above the market average, mainly
            large-cap stocks from among all U.S. stocks. (Linked to the FTSE High Dividend Yield
            Index).
          </p>
          <p className='text-bold mt-3 mb-2 text-xl'>Top component stocks</p>

          <table className='mx-auto w-full text-center text-sm text-gray-500 dark:text-gray-400 sm:w-1/2'>
            <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-4 py-2'>
                  Ticker and Company Name
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/JNJ'>
                    <a className='text-green-600 hover:text-green-200'>
                      JNJ:Johnson & Johnson(J&J)
                    </a>
                  </Link>
                </td>
              </tr>

              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/JPM'>
                    <a className='text-green-600 hover:text-green-200'>JPM:JP Morgan Chase & Co.</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/PG'>
                    <a className='text-green-600 hover:text-green-200'>PG:Procter & Gamble(P&G)</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/XOM'>
                    <a className='text-green-600 hover:text-green-200'>XOM:Exxon Mobil</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/CVX'>
                    <a className='text-green-600 hover:text-green-200'>CVX:Chevron</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/HD'>
                    <a className='text-green-600 hover:text-green-200'>HD:Home Depot</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/BAC'>
                    <a className='text-green-600 hover:text-green-200'>BAC:Bank of America</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/PFE'>
                    <a className='text-green-600 hover:text-green-200'>PFE:Pfizer </a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/ABBV'>
                    <a className='text-green-600 hover:text-green-200'>ABBV:AbbVie</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/AVGO'>
                    <a className='text-green-600 hover:text-green-200'>AVGO:Broadcom</a>
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
