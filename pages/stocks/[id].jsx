import React from "react";
import StockCandleChart from "../../components/StockCandleChart";
import styles from "../../styles/Home.module.css";
import { google } from 'googleapis';

export async function getServerSideProps({ query }) {
  const id = await query.id;

  const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });
  const sheets = google.sheets({ version: 'v4', auth });
  const googleSheetRange = `ContentsList!A2:Q1000`;

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
    const priceList = await fetch(`http://localhost:3000/stock/${id}.json`);
    const priceData = await priceList.json();

    const markerList = await fetch(`http://localhost:3000/marker/marker.json`);
    const markerData = await markerList.json();

    const edgarDataResponse = QTR.map(async (item) => {
      let reqList = await fetch(
        `http://localhost:3000/edgar/${item}/${id}.json`
      );
      const resData = await reqList.json();
      return resData[0];
    });
    const edgarRes = await Promise.all(edgarDataResponse);

    // GoogleSheet Data  Ticker == id の値をフィルタする。
    const response = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId: process.env.SHEET_ID,
      range:googleSheetRange,
    });
    const googleSheetData = response.data.values;
    const filteredSheetData = googleSheetData.filter(item => {
      return item[0] == id
    })

    return {
      props: {
        id,
        priceData,
        markerData,
        edgarData: edgarRes,
        filteredSheetData
      },
    };
  } catch (err) {
    return { props: { status: err.message } };
  }

}

const StockChart = ({ priceData,markerData, edgarData, id,filteredSheetData }) => {

  // console.log(filteredSheetData)
  return (
    <div className={styles.container}>
      <main className={styles.chartBlock}>
        <h2>{id} StockChartPage </h2>

        {priceData ? (
          <StockCandleChart priceData={priceData} edgarData={edgarData} markerData={markerData} />
        ) : (
          <p>株価データがありません</p>
        )}
        <h3>株式ニュース</h3>
        <p>News:{filteredSheetData[0][1]}</p>
        <p>Info:{filteredSheetData[0][2]}</p>
      </main>
    </div>
  );
};

export default StockChart;
