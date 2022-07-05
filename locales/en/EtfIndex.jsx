import React from 'react'
import Link from 'next/link'
import EtfCandleChart from './../../components/EtfCandleChart'
import EtfCompareLineChart from './../../components/EtfCompareLineChart'

const EtfIndex = ({ fundsData }) => {
  return (
    <div>
      <h2>Major U.S. ETF Comparison</h2>
      <div>Major U.S. index ETFs (Vanguar-ETSs, growth rate starting at the end of 2014)</div>

      <div className='mx-2 mt-8'>
        <p className='text-bold text-2xl'>VOO,VTI,VT</p>
        <EtfCompareLineChart fundsData={fundsData} />
        <div className='mx-auto md:w-4/5'>
          <p>VOO（red line）: ETFs linked to the S&P 500 Index</p>
          <p>
            VTI（green line）:The ETF covers approximately 4,000 stocks in the U.S. market,
            including small- and mid-cap stocks.
          </p>
          <p>
            VT（blue line）: An ETF that tracks both developed and emerging markets and is composed
            of stocks from the U.S. and abroad.
          </p>
          <p className='text-bold mt-3 mb-2 text-xl'>
            Top component stocks (common to VOO, VTI, VT)
          </p>

          <table className='mx-auto w-full text-center text-sm text-gray-500 dark:text-gray-400 sm:w-1/2'>
            <thead className='bg-gray-50 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-4 py-2'>
                  Ticker and Company Name
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/AAPL'>
                    <a className='text-green-600 hover:text-green-200'>AAPL:Apple</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/MSFT'>
                    <a className='text-green-600 hover:text-green-200'>MSFT:Microsoft</a>
                  </Link>
                </td>
              </tr>

              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/AMZN'>
                    <a className='text-green-600 hover:text-green-200'>AMZN:Amazon</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/GOOGL'>
                    <a className='text-green-600 hover:text-green-200'>GOOGL:Alphabet</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/TSLA'>
                    <a className='text-green-600 hover:text-green-200'>TSLA:Tesla</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/FB'>
                    <a className='text-green-600 hover:text-green-200'>META:Meta</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/NVDA'>
                    <a className='text-green-600 hover:text-green-200'>NVDA:Nvidia</a>
                  </Link>
                </td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <Link href='/stocks/BRK-B'>
                    <a className='text-green-600 hover:text-green-200'>BRKB:Berkshire Hathaway</a>
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
            VWO:Aims to achieve investment results that track the FTSE Emerging Markets Index. The
            ETF holds large- and mid-cap stocks in emerging markets around the world, including
            Brazil, Russia, India, Taiwan, China, South Africa, etc.
          </p>
          <p className='text-bold mt-3 mb-2 text-xl'>Top Component Stocks</p>
          <table className='mx-auto w-full text-center text-sm text-gray-500 dark:text-gray-400 sm:w-3/5'>
            <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-4 py-2'>
                  Ticker and Company Name
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>2330:TT(TSM:US)/Taiwan Semiconductor Manufacturing</td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>700:HK/Tencent Holdings Ltd.</td>
              </tr>

              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>9988:HK/Alibaba Group Holding Ltd.</td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>RIL:IN/Reliance Industries, Inc.</td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>INFO:IN/Infosys</td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>VALE3:BZ/Vale</td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>3690:HK/Meituan</td>
              </tr>
              <tr className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                <td className='px-4 py-2'>
                  <a>939:HK/China Construction</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default EtfIndex
