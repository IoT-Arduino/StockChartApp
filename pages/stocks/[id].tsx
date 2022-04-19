import React from "react";
import CandleChart from "../../components/CandleChart";
import StockCandleChart from "../../components/StockChart";
import styles from "../../styles/Home.module.css";

export async function getServerSideProps({ query }) {
  const id = query.id;

  try {
    const reqList = await fetch(`http://localhost:3000/stock/${id}.json`);
    const reqList2 = await fetch(
      `http://localhost:3000/edgar/2021q3/${id}.json`
    );
    const reqList3 = await fetch(
      `http://localhost:3000/edgar/2021q4/${id}.json`
    );
    const reqList4 = await fetch(
      `http://localhost:3000/edgar/2022q1/${id}.json`
    );
    const priceData = await reqList.json();
    const edgarData2: any = await reqList2.json();
    const edgarData3: any = await reqList3.json();
    const edgarData4: any = await reqList4.json();

    const edgarData: [] = [];
    await edgarData.push(edgarData2[0], edgarData3[0], edgarData4[0]);

    // console.log(priceData);

    return {
      props: {
        id,
        priceData,
        edgarData,
      },
    };
  } catch (err: any) {
    return { props: { status: err.message } };
  }

  // console.log(edinetData);
}

const StockChart = ({ priceData, edgarData, id }) => {
  // console.log(edinetData)

  // if (!priceData) {
  //   console.log("株価データがありません");
  // } else if (!edgarData) {
  //   console.log("Edinetデータがありません");
  // }

  // console.log(
  //   edgarData[0][0].period,
  //   "/ NetIncomeLoss ",
  //   edgarData[0][0].NetIncomeLoss,
  //   "/ Assets ",
  //   edgarData[0][0].Assets,
  //   "/ EarningsPerShareBasic ",
  //   edgarData[0][0].EarningsPerShareBasic
  // );
  // console.log(
  //   edgarData[1][0].period,
  //   "/ NetIncomeLoss ",
  //   edgarData[1][0].NetIncomeLoss,
  //   "/ Assets ",
  //   edgarData[1][0].Assets,
  //   "/ EarningsPerShareBasic",
  //   edgarData[1][0].EarningsPerShareBasic
  // );
  // console.log(
  //   edgarData[2][0].period,
  //   "/ NetIncomeLoss ",
  //   edgarData[2][0].NetIncomeLoss,
  //   "/ Assets ",
  //   edgarData[2][0].Assets,
  //   "/ EarningsPerShareBasic ",
  //   edgarData[2][0].EarningsPerShareBasic
  // );

  // console.log(edgarData);

  return (
    <div className={styles.container}>
      <main className={styles.chartBlock}>
        <div>StockChartPage {id}</div>

        {priceData ? (
          <StockCandleChart priceData={priceData} edgarData={edgarData} />
        ) : (
          <p>データがありません</p>
        )}
      </main>
    </div>
  );
};

export default StockChart;
