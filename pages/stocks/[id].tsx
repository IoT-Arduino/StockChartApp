import React from "react";
import CandleChart from "../../components/CandleChart";
// import StockCandleChart from "../../components/StockChart";
import StockCandleChartTest from "../../components/StockChartTest";
import styles from "../../styles/Home.module.css";
import { calcEdgarData } from "../../functions/CalcEdgarData";

export async function getServerSideProps({ query }) {
  const id = await query.id;

  // Edgar データを追加したら、ここにも追加すること。
  const QTR = [
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

    return {
      props: {
        id,
        priceData,
        markerData,
        edgarData: edgarRes,
      },
    };
  } catch (err: any) {
    return { props: { status: err.message } };
  }

}

const StockChart = ({ priceData,markerData, edgarData, id }) => {
  // const IncomeData = calcEdgarData(edgarData);
  console.log(edgarData)

  return (
    <div className={styles.container}>
      <main className={styles.chartBlock}>
        <h2>{id} StockChartPage </h2>

        {/* {priceData ? (
          <StockCandleChart priceData={priceData} edgarData={edgarData} />
        ) : (
          <p>データがありません</p>
        )} */}

        {priceData ? (
          <StockCandleChartTest priceData={priceData} edgarData={edgarData} markerData={markerData}/>
        ) : (
          <p>株価データがありません</p>
        )}
      </main>
    </div>
  );
};

export default StockChart;
