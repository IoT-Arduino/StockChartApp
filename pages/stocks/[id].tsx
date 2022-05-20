import React,{useEffect,useState} from 'react'
import Link from "next/link";

import StockCandleChart from "../../components/StockCandleChart";
import styles from "../../styles/Home.module.css";
// import { google } from 'googleapis';
// Supabase
import { supabase } from '../../utils/supabase'
import Comments from '../../components/Comments'
import BookMark from '../../components/BookMark'
import InputMarker from '../../components/InputMarker'

import {useContext}from 'react'
import { UserContext } from "../../utils/UserContext";

import { createMarkerData } from "../../functions/CreateMarkerData"
import { getMarkerData } from "../../functions/GetMarkerData"

export async function getServerSideProps({ query }) {
  const id = await query.id;

  // const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });
  // const sheets = google.sheets({ version: 'v4', auth });
  // const googleSheetRange = `ContentsList!A2:Q1000`;

  // Edgar データを追加したら、ここにも追加すること。
  const QTR = [
    "2017q1",
    "2017q2",
    "2017q3",
    "2017q4",
    "2018q1",
    "2018q2",
    "2018q3",
    "2018q4",
    "2019q1",
    "2019q2",
    "2019q3",
    "2019q4",
    "2020q1",
    "2020q2",
    "2020q3",
    "2020q4",
    "2021q1",
    "2021q2",
    "2021q3",
    "2021q4",
    "2022q1",
  ];

  try {
    const reqList = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDOPOINT}/stockCode/US-StockList.json`
    );
    const codeList = await reqList.json();
    const companyInfo = codeList.filter(item =>{
      return item.Ticker === id
    })

    const markerList = await fetch(`${process.env.NEXT_PUBLIC_API_ENDOPOINT}/marker/marker.json`);
    const markerData = await markerList.json();

    const priceList = await fetch(`${process.env.NEXT_PUBLIC_API_ENDOPOINT}/stock/${id}.json`);
    const priceData = await priceList.json();

    const edgarDataResponse = QTR.map(async (item) => {
      let reqList = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDOPOINT}/edgar/${item}/${id}.json`
      );

      let reqList2 = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDOPOINT}/edgar/${item}/${id}_2.json`
      );
      // もし　reqList2があったら、仮配列にpush、...で展開したものをreturnする。
      if (reqList.status == 404 && reqList2.status == 404) {
        return null
      } else if (reqList.status == 200 && reqList2.status == 404) {
        const resData = await reqList.json();
        return resData[0];
      } else if (reqList.status == 200 && reqList2.status == 200) {
        const resData = await reqList.json();
        const resData2 = await reqList2.json();
        const tempResData = [resData[0], resData2[0]]
        return tempResData;
      } else {
        return null
      }

    });

    
    const edgarResData = await Promise.all(edgarDataResponse);
    const edgarRes = await edgarResData.filter(item =>item)
    // console.log(edgarRes[0].CIK)

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
        markerData,
        edgarData: edgarRes.flat(),  // edgarRes.flat(),
        // filteredSheetData,
      },
    };
  } catch (err) {
    return { props: { status: err.message } };
  }

}

const StockChart = ({ priceData,markerData, edgarData, id,companyInfo }) => {

  // console.log(filteredSheetData)

  const [marker, setMarker] = useState([])
  const { user, session } = useContext(UserContext);
  
   useEffect(() => {
    if (user) {
      fetchMarker()
    } else {
      setMarker(markerData)
    }
  }, [])

  const fetchMarker = async () => {
    let { data: items, error } = await supabase
      .from('marker')
      .select('*')
      .match({ticker: id, user_id: user.id})
    if (error) console.log('error', error)
    else {
      const markerFetchedTemp = getMarkerData(items)
      setMarker(markerFetchedTemp)
    }
  }


  return (
    <div className={styles.container}>
      <div className={styles.chartBlock}>
        <div className="flex justify-between"><h2>{id} StockChartPage </h2>
        {!user ? <p>ログイン</p> : (
          <div>
            <BookMark user={supabase.auth.user()} ticker={id} />
          </div>
        )}</div>

        {priceData ? (
          <StockCandleChart priceData={priceData} edgarData={edgarData} marker={marker} id={id} companyInfo={companyInfo}/>
        ) : (
          <p>株価データがありません</p>
        )}

        {/*
          <div className="my-4">
            <h3 className="text-lg font-bold">株式ニュース</h3>
            {filteredSheetData[0] ? <>
            <p className="mx-2">News:{filteredSheetData[0][1] ? filteredSheetData[0][1] : ""}</p>
            <p className="mx-2">Info:{filteredSheetData[0][2] ? filteredSheetData[0][2] : ""}</p></>
                : ""}
          </div>
        */}


        <div className="my-4">
          {!user ? <p>会員限定情報エリア</p>: (
            <div className="my-3">
              <Comments user={supabase.auth.user()} ticker={id} />
              <InputMarker user={supabase.auth.user()} ticker={id} />
            </div>
          )}
        </div>

        <div className="my-4">
        <h3 className="text-lg font-bold">財務情報確認</h3>
          <p className="mx-2"><a href={`https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${priceData[0].CIK}&type=&dateb=&owner=exclude&count=40&search_text=`}>EDGARサイト</a></p>
          <p className="mx-2"><a href={`https://stocks.finance.yahoo.co.jp/us/annual/${priceData[0].Ticker}`}>Yahooファイナンス</a></p>
          <p className="mx-2"><a href={`https://finance.yahoo.com/quote/${priceData[0].Ticker}/financials?p=${priceData[0].Ticker}`}>YahooファイナンスUS</a></p>
          <p className="mx-2"><a href={`https://us.kabutan.jp/stocks/${priceData[0].Ticker}/finance`}>株探US</a></p>
        </div>

        <Link href="/stocks">
          <a>株式情報一覧ページへ</a>
        </Link>

      </div>
    </div>
  );
};

export default StockChart;
