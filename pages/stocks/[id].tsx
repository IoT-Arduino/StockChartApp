import React, { useEffect, useState } from 'react'
import Error from 'next/error'
import { useContext } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'

// Supabase
import { UserContext } from '../../utils/UserContext'

// Components & Utils
import BookMarkState from '../../components/BookMarkState'
import StockCandleChart from '../../components/StockCandleChart'
import { getMarkerData } from '../../functions/GetMarkerData'
// import { codeList } from '../../data/stockCode/US-StockList'

// json fs
import fsPromises from 'fs/promises'
import path from 'path'
const fs = require('fs')

// types
import { Company } from '../../types/Company'
import { StockPrice } from '../../types/StockPrice'

// hooks
import { useQueryMarker } from '../../hooks/useQueryMarker'

// GoolgeSheet
import { getStockInfo } from '../../utils/googleApiStock'

// i18n
import en from './../../locales/en/en'
import ja from './../../locales/ja/ja'
import { useRouter } from 'next/router'
import { markerListJa } from '../../data/marker/markerJa'
import { markerListEn } from '../../data/marker/markerEn'

export async function getStaticPaths() {
  // const filePath = path.join(process.cwd(), `./data/stockCode/US-StockList.json`)
  // const jsonData = await fsPromises.readFile(filePath)
  // const objectData = JSON.parse(jsonData as any)
  // const pathsFromObject = objectData.map(() => {
  //   return {
  //     params: { id: 'MSFT' },
  //   }
  // })

  return {
    paths: [{ params: { id: 'AMZN' } },{ params: { id: 'NVDA' } },{ params: { id: 'TSLA' } },{ params: { id: 'MSFT' } }, { params: { id: 'AAPL' } }],
    fallback: 'blocking', // false or 'blocking'
  }
}

export const getStaticProps: GetServerSideProps = async ({ params }) => {
  // const id = await query.id
  const id = await params?.id

  // Edgar データを追加したら、ここにも追加すること。
  const QTR = [
    '2017q1',
    '2017q2',
    '2017q3',
    '2017q4',
    '2018q1',
    '2018q2',
    '2018q3',
    '2018q4',
    '2019q1',
    '2019q2',
    '2019q3',
    '2019q4',
    '2020q1',
    '2020q2',
    '2020q3',
    '2020q4',
    '2021q1',
    '2021q2',
    '2021q3',
    '2021q4',
    '2022q1',
    '2022q2',
    // '2022_04',
    // '2022_05',
  ]

  type stockListType = {
    PagingNum: number
    Ticker: string
    Name: string
    ShortName: string
    Country: string | null
    'IPO Year': number | null
    Sector: string | null
    Industry: string | null
    Market: string | null
    'Market Cap': number | null
    CIK: number
    ADR: string | null
    Unlist: string | null
    SP500: string | null
  }

  try {
    // stockList data from json file
    const filePathStockList = path.join(process.cwd(), `./data/stockCode/US-StockList.json`)
    const jsonDataStockList = await fsPromises.readFile(filePathStockList)
    const objectDataStockList: stockListType[] = JSON.parse(jsonDataStockList as any)

    const companyInfo = objectDataStockList.filter((item: stockListType) => {
      return item.Ticker === id
    })

    // Paging処理 prev が1以下およびnext がmax時の対応
    const listedStockList = objectDataStockList.filter((item: stockListType) => {
      return item.Unlist === null
    })
    const maxPagingNum = listedStockList.length
    const currentPageNum = companyInfo[0].PagingNum

    const prevCompany = objectDataStockList.filter((item: stockListType) => {
      if (companyInfo[0].PagingNum === 1) {
        return item.PagingNum === maxPagingNum
      } else {
        return item.PagingNum === currentPageNum - 1
      }
    })

    const nextCompany = objectDataStockList.filter((item: stockListType) => {
      if (currentPageNum === maxPagingNum) {
        return item.PagingNum === 1
      } else {
        return item.PagingNum === currentPageNum + 1
      }
    })

    // price data from json file
    const filePathPrice = path.join(process.cwd(), `./data/stock/${id}.json`)
    const jsonDataPrice = await fsPromises.readFile(filePathPrice)
    const priceData = JSON.parse(jsonDataPrice as any)

    // edgar from json file
    const edgarDataResponse = QTR.map(async (item) => {
      let tempResData
      if (
        fs.existsSync(`./data/edgar/${item}/${id}.json`) &&
        fs.existsSync(`./data/edgar/${item}/${id}_2.json`)
      ) {
        const filePathEdgar2 = path.join(process.cwd(), `./data/edgar/${item}/${id}_2.json`)
        const jsonDataEdgar2 = await fsPromises.readFile(filePathEdgar2)
        const reqList2 = JSON.parse(jsonDataEdgar2 as any)

        const filePathEdgar = path.join(process.cwd(), `./data/edgar/${item}/${id}.json`)
        const jsonDataEdgar = await fsPromises.readFile(filePathEdgar)
        const reqList = JSON.parse(jsonDataEdgar as any)

        tempResData = [reqList[0], reqList2[0]]
      } else if (
        fs.existsSync(`./data/edgar/${item}/${id}.json`) &&
        fs.existsSync(`./data/edgar/${item}/${id}_2.json`) === false
      ) {
        const filePathEdgar = path.join(process.cwd(), `./data/edgar/${item}/${id}.json`)
        const jsonDataEdgar = await fsPromises.readFile(filePathEdgar)
        const reqList = JSON.parse(jsonDataEdgar as any)
        tempResData = [reqList[0]]
      } else {
        return null
      }
      return tempResData
    })

    const edgarResData = await Promise.all(edgarDataResponse)
    const edgarRes = await edgarResData.filter((item) => item)

    // GoolgeSheet
    const filteredSheetDataTemp = await getStockInfo(id)
    const filteredSheetData = filteredSheetDataTemp ? filteredSheetDataTemp : null

    return {
      props: {
        id,
        companyInfo: companyInfo[0],
        priceData,
        // markerData,
        edgarData: edgarRes.flat(), // edgarRes.flat(),
        filteredSheetData,
        prevTicker: prevCompany[0].Ticker,
        nextTicker: nextCompany[0].Ticker,
      },
    }
  } catch (err: any) {
    return { props: { status: err.message } }
  }
}

const StockChart: NextPage<{
  priceData: StockPrice
  markerData: any
  edgarData: any
  id: any
  companyInfo: Company
  filteredSheetData: any
  status: any
  prevTicker: String
  nextTicker: String
}> = ({
  priceData,
  edgarData,
  id,
  companyInfo,
  filteredSheetData,
  status,
  prevTicker,
  nextTicker,
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user, session } = useContext(UserContext)
  const [signIn, setSignIn] = useState(false)

  const { data: markers, status: statusMarker } = useQueryMarker()
  const makersWithTicker = markers?.filter((item) => {
    return item.ticker == id
  })

  // i18n 対応用
  const router = useRouter()
  const { locale } = router
  let t
  let sheetData
  let markerList: any
  if (locale === 'ja-JP') {
    t = ja
    sheetData = filteredSheetData.newsDataFiltered ? filteredSheetData.newsDataFiltered : null
    markerList = markerListJa
  } else {
    t = en
    sheetData = filteredSheetData.infoDataFiltered ? filteredSheetData.infoDataFiltered : null
    markerList = markerListEn
  }

  const markerFunc = () => {
    if (makersWithTicker?.length) {
      const markerFetchedTemp = getMarkerData(makersWithTicker)
      return markerFetchedTemp
    } else {
      return markerList
    }
  }

  const marker = markerFunc()

  useEffect(() => {
    if (!user) {
      setSignIn(false)
    } else {
      setSignIn(true)
    }
  }, [user])

  if (status) {
    console.log(status)
    return <Error statusCode={404} />
  }

  return (
    <>
      <NextSeo
        title={companyInfo.Name + ':' + t.pageTitleStockId}
        description={companyInfo.Name + ':' + t.pageDescStockId}
      />
      <div className='mx-auto max-w-5xl'>
        <div className='flex flex-wrap items-center justify-between'>
          <h2>
            {companyInfo.Name} [{id}]
          </h2>
          {companyInfo.Unlist ? (
            <p className='font-bold text-red-600'>{t.stockIdIsEditing}</p>
          ) : null}

          {!signIn ? (
            <></>
          ) : (
            <div className='flex-none'>
              <BookMarkState ticker={id} t={t} />
            </div>
          )}
        </div>

        <div>
          {priceData ? (
            <StockCandleChart
              priceData={priceData}
              edgarData={edgarData}
              marker={marker}
              id={id}
              companyInfo={companyInfo}
              prevTicker={prevTicker}
              nextTicker={nextTicker}
              signIn={signIn}
              t={t}
            />
          ) : (
            <p>{t.stockIdNoStockData}</p>
          )}
        </div>

        <div className='mt-8 mb-6'>
          <h4 className='text-sm font-bold'>{t.stockIdIsUnit}</h4>
          <ul className='mx-8 text-xs'>
            <li className='list-disc'>{t.stockIdIsUnit1}</li>
            <li className='list-disc'>{t.stockIdIsUnit2}</li>
            <li className='list-disc'>{t.stockIdIsUnit3}</li>
            <li className='list-disc'>P{t.stockIdIsUnit4}</li>
          </ul>
        </div>

        {sheetData ? (
          <div className='my-8'>
            <h3 className='my-0 text-lg font-bold'>{t.stockIdStockInfoTitle}</h3>
            <ul className='my-2'>
              {sheetData?.map((item, i) => {
                return (
                  <li key={i}>
                    {item.date}
                    {'  '}
                    <span
                      dangerouslySetInnerHTML={{
                        __html: item.news,
                      }}
                    />
                  </li>
                )
              })}
            </ul>
          </div>
        ) : null}

        <div className='my-12'>
          <h3 className='text-lg font-bold'>{t.stockIdLinkInfoTitle}</h3>
          <p className='mx-2'>
            <a
              href={`https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${priceData[0].CIK}&type=&dateb=&owner=exclude&count=40&search_text=`}
              target='_blank'
              rel='noopener noreferrer'
            >
              EDGAR Web Site-{id}
            </a>
          </p>
          <p className='mx-2'>
            <a
              href={`https://finance.yahoo.com/quote/${priceData[0].Ticker}/financials?p=${priceData[0].Ticker}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              YahooFinance US-{id}
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default StockChart
