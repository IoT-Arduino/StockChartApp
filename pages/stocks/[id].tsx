import React, { useEffect, useState } from 'react'
import Error from 'next/error'
import { useContext } from 'react'
import { GetServerSideProps, NextPage } from 'next'

import * as AiIcons from 'react-icons/ai';
// import { google } from 'googleapis';

// Supabase
import { supabase } from '../../utils/supabase'
import { UserContext } from '../../utils/UserContext'

// Components & Utils
import InputComments from '../../components/InputComments'
import BookMark from '../../components/BookMark'
import InputMarker from '../../components/InputMarker'
import StockCandleChart from '../../components/StockCandleChart'

import { createMarkerData } from '../../functions/CreateMarkerData'
import { getMarkerData } from '../../functions/GetMarkerData'
import { markerList } from '../../data/marker/marker'

// json fs
import fsPromises from 'fs/promises'
import path from 'path'
const fs = require('fs')

// types
import { Company } from '../../types/Company'
import { StockPrice } from '../../types/StockPrice'

import { codeList } from '../../data/stockCode/US-StockList'

export async function getStaticPaths() {
  // const filePath = path.join(process.cwd(), `./data/stockCode/US-StockList.json`);
  // const jsonData = await fsPromises.readFile(filePath);
  // const objectData = JSON.parse(jsonData as any);

  const paths = codeList.map((item) => {
    return {
      params: { id: 'MSFT' },
    }
  })

  return {
    paths,
    // paths: [
    //   { params: { ... } }
    // ],
    fallback: 'blocking', // false or 'blocking'
  }
}

export const getStaticProps: GetServerSideProps = async ({ query, params }) => {
  // const id = await query.id
  const id = await params?.id

  // const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });
  // const sheets = google.sheets({ version: 'v4', auth });
  // const googleSheetRange = `ContentsList!A2:Q1000`;

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
  ]

  try {
    // stockList data from json file
    const filePathStockList = path.join(process.cwd(), `./data/stockCode/US-StockList.json`)
    const jsonDataStockList = await fsPromises.readFile(filePathStockList)
    const objectDataStockList = JSON.parse(jsonDataStockList as any)

    const companyInfo = objectDataStockList.filter((item) => {
      return item.Ticker === id
    })

    // Get Company Data
    // const reqListCompany = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_ENDOPOINT}/stockCode/US-StockList.json`
    // )
    // const codeList:Company[] = await reqListCompany.json()

    // const companyInfo = codeList.filter((item) => {
    //   return item.Ticker === id
    // })

    // Get Marker Data
    // const markerList = await fetch(`${process.env.NEXT_PUBLIC_API_ENDOPOINT}/marker/marker.json`)
    // const errorCode1 = markerList.status==200 ?  200 : markerList.status
    // const markerData = await markerList.json()

    // price data from json file
    const filePathPrice = path.join(process.cwd(), `./data/stock/${id}.json`)
    const jsonDataPrice = await fsPromises.readFile(filePathPrice)
    const priceData = JSON.parse(jsonDataPrice as any)

    // Get Price Data
    // const priceList = await fetch(`${process.env.NEXT_PUBLIC_API_ENDOPOINT}/stock/${id}.json`)
    // const priceData = await priceList.json()

    // edgar from json file
    const edgarDataResponse = QTR.map(async (item) => {
      let tempResData
      if (
        fs.existsSync(`./data/edgar/${item}/${id}_2.json`) &&
        fs.existsSync(`./data/edgar/${item}/${id}_2.json`)
      ) {
        const filePathEdgar = path.join(process.cwd(), `./data/edgar/${item}/${id}.json`)
        const jsonDataEdgar = await fsPromises.readFile(filePathEdgar)
        const reqList = JSON.parse(jsonDataEdgar as any)

        const filePathEdgar2 = path.join(process.cwd(), `./data/edgar/${item}/${id}_2.json`)
        const jsonDataEdgar2 = await fsPromises.readFile(filePathEdgar2)
        const reqList2 = JSON.parse(jsonDataEdgar2 as any)
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
      return tempResData[0]
    })

    // Get Edgar Data
    // const edgarDataResponse = QTR.map(async (item) => {
    //   let reqList = await fetch(`${process.env.NEXT_PUBLIC_API_ENDOPOINT}/edgar/${item}/${id}.json`)

    //   let reqList2 = await fetch(
    //     `${process.env.NEXT_PUBLIC_API_ENDOPOINT}/edgar/${item}/${id}_2.json`
    //   )
    //   // もし　reqList2があったら、仮配列にpush、...で展開したものをreturnする。
    //   if (reqList.status == 404 && reqList2.status == 404) {
    //     return null
    //   } else if (reqList.status == 200 && reqList2.status == 404) {
    //     const resData = await reqList.json()
    //     return resData[0]
    //   } else if (reqList.status == 200 && reqList2.status == 200) {
    //     const resData = await reqList.json()
    //     const resData2 = await reqList2.json()
    //     const tempResData = [resData[0], resData2[0]]
    //     return tempResData
    //   } else {
    //     return null
    //   }
    // })

    const edgarResData = await Promise.all(edgarDataResponse)
    const edgarRes = await edgarResData.filter((item) => item)

    // GoogleSheet Data  Ticker == id の値をフィルタする。
    // const response = await sheets.spreadsheets.values.get({
    //   auth,
    //   spreadsheetId: process.env.SHEET_ID,
    //   range:googleSheetRange,
    // });
    // const googleSheetData = response.data.values;
    // const filteredSheetData = googleSheetData.filter(item => {
    //   return item[0] == id
    // })

    return {
      props: {
        id,
        companyInfo: companyInfo[0],
        priceData,
        // markerData,
        edgarData: edgarRes.flat(), // edgarRes.flat(),
        // filteredSheetData,
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
  status: any
}> = ({ priceData, edgarData, id, companyInfo, status }) => {
  if (status) {
    console.log(status)
    return <Error statusCode={404} />
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [marker, setMarker] = useState([])
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user, session } = useContext(UserContext)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (user) {
      fetchMarker()
    } else {
      setMarker(markerList as any)
    }
  }, [user])

  //
  const fetchMarker = async () => {
    if (user) {
      let { data: items, error } = await supabase
        .from('marker')
        .select('*')
        .match({ ticker: id, user_id: user.id })
      if (error) console.log('error', error)
      else {
        const markerFetchedTemp = getMarkerData(items)
        setMarker(markerFetchedTemp)
      }
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className='flex flex-wrap items-center justify-between'>
        <h2>
          {companyInfo.Name} [{id}]
        </h2>

        {!user ? null : (
          <div className="flex-none">
            <BookMark user={supabase.auth.user()} ticker={id} />
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
          />
        ) : (
          <p>株価データがありません</p>
        )}
      </div>

      {/*
          <div className="my-4">
            <h3 className="text-lg font-bold">株式ニュース</h3>
            {filteredSheetData[0] ? <>
            <p className="mx-2">News:{filteredSheetData[0][1] ? filteredSheetData[0][1] : ""}</p>
            <p className="mx-2">Info:{filteredSheetData[0][2] ? filteredSheetData[0][2] : ""}</p></>
                : ""}
          </div>
        */}

      <div className='my-4'>
        {!user ? (
          <></>
        ) : (
          <div className='my-3'>
            <InputComments user={supabase.auth.user()} ticker={id} />
            <InputMarker user={supabase.auth.user()} ticker={id} />
          </div>
        )}
      </div>

      <div className='my-12'>
        <h3 className='text-lg font-bold'>財務情報サイト</h3>
        <p className='mx-2'>
          <a
            href={`https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${priceData[0].CIK}&type=&dateb=&owner=exclude&count=40&search_text=`}
            target='_blank'
            rel='noreferrer'
          >
            EDGARサイト-{id}
          </a>
        </p>
        <p className='mx-2'>
          <a
            href={`https://stocks.finance.yahoo.co.jp/us/annual/${priceData[0].Ticker}`}
            target='_blank'
            rel='noreferrer'
          >
            Yahooファイナンス-{id}
          </a>
        </p>
        <p className='mx-2'>
          <a
            href={`https://finance.yahoo.com/quote/${priceData[0].Ticker}/financials?p=${priceData[0].Ticker}`}
            target='_blank'
            rel='noreferrer'
          >
            YahooファイナンスUS-{id}
          </a>
        </p>
      </div>
    </div>
  )
}

export default StockChart
