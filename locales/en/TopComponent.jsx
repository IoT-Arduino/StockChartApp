import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

// images
// import DummyImage from './../../public/images/TopAppleChart.png'
import UNHChart from './../../public/images/UNHChart.png'
import TSLAChart from './../../public/images/TSLAChart.png'
import AAPLCandleChart from './../../public/images/AAPLCandleChartEn.png'
import AAPLCashFlow from './../../public/images/AAPLCashFlowEn.png'

export const TopComponentE = () => {
  return (
    <div>
      <section className='text-gray-600'>
        <div className='mx-auto w-full px-3 pt-2 sm:pt-10 md:max-w-2xl'>
          <div className='mb-8'>
            <div className='px-2 text-xl lg:px-10'>
              <p>
                <span className='font-bold'>
                  TenQ charts combines stock price candlesticks and financial data time series
                  charts to give an intuitive, big-picture overview of a company's performance and
                  stock price.
                </span>
                Please use it as a screening tool for stock issues and as one of the materials for
                stock investment decisions.
              </p>
              <p>
                Before going into a complex and detailed stock analysis, you can get a time-series
                overview of the relationship between a company's business value and its stock price.
              </p>
              <p className='font-bold'>
                Using the TenQ chart will increase your investment power several fold.
              </p>
            </div>

            <div className='my-8 md:my-12 flex justify-center'>
              <div className='inline-flex h-1 w-16 rounded-full bg-green-500'></div>
            </div>
          </div>
        </div>
      </section>

      <section className='body-font text-gray-600'>
        <div className='mx-auto max-w-5xl'>
          <h2 className='mx-auto mt-0 mb-4 w-4/5 text-gray-600 md:mt-4 md:mb-0'>
            Check the correlation between BPS, EPS and stock price in time series.
          </h2>
          <div className='mx-auto flex max-w-5xl flex-col items-center px-3 py-4 md:flex-row'>
            <div className='md:w-1/2 lg:w-full lg:max-w-lg'>
              <Image
                className='rounded object-cover object-center'
                alt='hero'
                src={AAPLCandleChart}
                width={512}
                height={192}
              />
            </div>
            <div className='mt-4 flex flex-col items-center md:mt-0 md:mb-0 md:w-1/2 md:items-start md:pl-8 md:text-left lg:flex-grow'>
              <p className='leading-relaxed'>
                The relationship between BPS, PBR, EPS, PER, and stock price, which are considered
                important in verifying a company's business performance, are listed in chronological
                order in an easy-to-understand manner. By comparing the stock price to the "TenQ
                chart line," the level of the sum of BPS and EPS times 15 (PER 15x), you can
                intuitively understand the gap between the current stock price and the company's
                business and asset value. In addition, a marker display has been added to the stock
                chart to indicate important social events, such as the start of an interest rate
                hike. This enables an accurate understanding of stock price trends based on the
                relationship between a company's performance and social events, and provides
                easy-to-understand, high-quality information for optimal investment decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className='body-font text-gray-600'>
        <div className='mx-auto max-w-5xl'>
          <h2 className='mt-0 mb-4 md:mt-4 md:mb-0 mx-auto w-4/5 text-gray-600'>
            Operating cash flow margin, operating cash flow and net income in chronological order.
          </h2>
          <div className='mx-auto flex max-w-5xl flex-col items-center px-3 py-8 md:flex-row'>
            <div className='w-5/6 md:w-1/2 lg:w-full lg:max-w-lg'>
              <Image
                className='rounded object-cover object-center'
                alt='hero'
                src={AAPLCashFlow}
                width={512}
                height={144}
              />
            </div>
            <div className='mt-8 flex flex-col items-center md:mb-0 md:w-1/2 md:items-start md:pl-8 md:text-left lg:flex-grow'>
              <p className='mb-8 leading-relaxed'>
                The report provides an easy-to-understand overview of operating cash flow, operating
                cash flow margin (operating cash flow/sales), and operating cash flow vs. net
                income, all of which are considered important when checking a company's financial
                performance. The ability to view financial data in chronological order on the same
                screen as the stock price allows the user to intuitively determine the value of an
                investment in a stock.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className='mb-2'>
          <div className='mx-auto w-full max-w-xl rounded-xl bg-yellow-100 bg-opacity-80 px-4 pt-1 pb-4 text-center text-gray-800 shadow-xl sm:w-2/3'>
            <h2 className='text-xl font-extrabold sm:text-2xl md:text-4xl'>TenQ Chart</h2>
            <p className='mx-auto mb-2 font-sans font-extrabold sm:mb-4 sm:w-full sm:px-2 md:text-xl'>
              Intuitive confirmation of quarterly earnings and stock prices of U.S. companies
            </p>
            <div className='mb-2'>
              <Link href='/stocks'>
                <a className='text-lg font-extrabold text-green-500 hover:text-green-200'>
                  Check out the list of 500 leading U.S. stocks!
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className='body-font text-gray-600'>
        <div className='mx-auto max-w-5xl'>
          <div className='mx-auto flex max-w-5xl flex-col items-center px-2 py-8 md:flex-row'>
            <div className='w-5/6 md:w-1/2 lg:w-full lg:max-w-lg'>
              <Image
                className='rounded object-cover object-center'
                alt='hero'
                src={TSLAChart}
                width={512}
                height={367}
              />
            </div>
            <div className='mt-8 flex flex-col items-center md:mb-0 md:w-1/2 md:items-start md:pl-8 md:text-left lg:flex-grow'>
              <h2 className='title-font mb-4 text-xl font-medium text-gray-900 sm:text-2xl'>
                Stock Analysis: Growth Stocks
                <br className='hidden lg:inline-block' />
                Tesla[TSLA]
              </h2>
              <p className='mb-8 leading-relaxed'>
                Since 2020, we can see that earnings (sales, cash flow from operating activities,
                and net income) have been rising at a tremendous rate, lagging the rise in the stock
                price. Currently, the company is well off the TenQ chart line (BPS+PER*15) and can
                be considered overbought, but if earnings continue to rise at this rate and earnings
                catch up with the share price, the share price could rise further ahead of the
                company. This is a typical growth stock chart.
              </p>
              <Link href='/stocks/TSLA'>
                <a className='text-green-500 hover:text-green-200'>TSLA:Go to Tesla Chart Page</a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className='body-font text-gray-600'>
        <div className='mx-auto max-w-5xl'>
          <div className='mx-auto flex max-w-5xl flex-col items-center px-2 py-8 md:flex-row'>
            <div className='w-5/6 md:w-1/2 lg:w-full lg:max-w-lg'>
              <Image
                className='rounded object-cover object-center'
                alt='hero'
                src={UNHChart}
                width={512}
                height={274}
              />
            </div>
            <div className='mt-8 flex flex-col items-center md:mb-0 md:w-1/2 md:items-start md:pl-8 md:text-left lg:flex-grow'>
              <h2 className='title-font mb-4 text-xl font-medium text-gray-900 sm:text-2xl'>
                Stock Analysis : High Dividend value stock
                <br className='hidden lg:inline-block' />
                UnitedHealth Group[UNH]
              </h2>
              <p className='mb-8 leading-relaxed'>
                It will be a representative company of the very solid health sector, which is not
                greatly affected by boom and bust, and steadily accumulates profit (green area) and
                net assets (blue area). Although the slightly low operating cash flow margin is a
                concern, the relationship between operating cash flow (bar chart in green) and net
                income (bar chart in yellow) is very good, indicating that this is an excellent
                company with very stable earning power in its core business.
              </p>
              <Link href='/stocks/UNH'>
                <a className='text-green-500 hover:text-green-200'>
                  UNH:Go to United Health Chart Page
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className='body-font text-gray-600'>
        <div className='mx-auto w-full px-2 py-8 md:max-w-5xl'>
          <div className='mb-12 text-center'>
            <h2 className='title-font mb-4 text-2xl font-medium text-gray-900 sm:text-3xl'>
              Index Fund (ETF) and Sector Fund (ETF) Comparison and Analysis
            </h2>
            <p className='text-gray-500s mx-auto text-base leading-relaxed lg:w-3/4 xl:w-2/4'>
              If you are interested in index funds and high dividend funds, please see this page for
              a comparative analysis chart of the funds. A list of the top constituents is provided
              for each fund. You can also click on the list of top constituents to view TenQ charts
              for individual stocks.
            </p>
            <div className='mt-6 flex justify-center'>
              <div className='inline-flex h-1 w-16 rounded-full bg-green-500'></div>
            </div>
          </div>
          <div className='mb-10 mt-4 flex flex-wrap space-y-6 sm:m-4 md:space-y-0'>
            <div className='flex flex-col items-center p-2 text-center md:w-1/3'>
              <div className='mb-5 inline-flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-500'>
                <svg
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  className='h-10 w-10'
                  viewBox='0 0 24 24'
                >
                  <path d='M22 12h-4l-3 9L9 3l-3 9H2'></path>
                </svg>
              </div>
              <div className='flex-grow'>
                <h2 className='title-font mb-3 text-lg font-medium text-gray-900'>
                  Index Funds (U.S. & World Stocks)
                </h2>
                <p className='text-base leading-relaxed'>
                  Comparative analysis of the growth rates of VOO, VTI, and VT starting at the end
                  of 2014. We will also list the top component stocks.
                </p>
                <Link href={`/etfs/etf-index`}>
                  <a className='mt-3 inline-flex items-center text-green-500'>
                    Go to Index ETF
                    <svg
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='ml-2 h-4 w-4'
                      viewBox='0 0 24 24'
                    >
                      <path d='M5 12h14M12 5l7 7-7 7'></path>
                    </svg>
                  </a>
                </Link>
              </div>
            </div>
            <div className='flex flex-col items-center p-2 text-center md:w-1/3'>
              <div className='mb-5 inline-flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-500'>
                <svg
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  className='h-10 w-10'
                  viewBox='0 0 24 24'
                >
                  <path d='M22 12h-4l-3 9L9 3l-3 9H2'></path>
                </svg>
              </div>
              <div className='flex-grow'>
                <h2 className='title-font mb-3 text-lg font-medium text-gray-900'>
                  High Dividend stock fund
                </h2>
                <p className='text-base leading-relaxed'>
                  Comparative analysis of the growth rates of VYG and VYM starting from the end of
                  2014. We will also list the top component stocks.
                </p>
                <Link href={`/etfs/etf-highDividend`}>
                  <a className='mt-3 inline-flex items-center text-green-500'>
                    Go to Highdividend ETF
                    <svg
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='ml-2 h-4 w-4'
                      viewBox='0 0 24 24'
                    >
                      <path d='M5 12h14M12 5l7 7-7 7'></path>
                    </svg>
                  </a>
                </Link>
              </div>
            </div>
            <div className='flex flex-col items-center p-2 text-center md:w-1/3'>
              <div className='mb-5 inline-flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-500'>
                <svg
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  className='h-10 w-10'
                  viewBox='0 0 24 24'
                >
                  <path d='M22 12h-4l-3 9L9 3l-3 9H2'></path>
                </svg>
              </div>
              <div className='flex-grow'>
                <h2 className='title-font mb-3 text-lg font-medium text-gray-900'>
                  Healthcare Sector Comparison and Analysis
                </h2>
                <p className='text-base leading-relaxed'>
                  We will compare the Health Care Sector Fund to a market index. It will also list
                  the top constituent stocks.
                </p>
                <Link href={`/etfs/etf-healthCare`}>
                  <a className='mt-3 inline-flex items-center text-green-500'>
                    Go to Health Care ETF
                    <svg
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='ml-2 h-4 w-4'
                      viewBox='0 0 24 24'
                    >
                      <path d='M5 12h14M12 5l7 7-7 7'></path>
                    </svg>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
