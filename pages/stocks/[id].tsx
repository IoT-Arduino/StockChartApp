import React from "react";
import CandleChart from "../../components/CandleChart";
// import StockCandleChart from "../../components/StockChart";
import StockCandleChartTest from "../../components/StockChartTest";
import styles from "../../styles/Home.module.css";

export async function getServerSideProps({ query }) {
  const id = await query.id;

  const QTR = ["2021q1","2021q2","2021q3","2021q4", "2022q1"]

  try {
    const priceList = await fetch(`http://localhost:3000/stock/${id}.json`);
    const priceData = await priceList.json();

    const edgarDataResponse = QTR.map(async (item) => {
      let edgarData: object[] = [];
      let reqList = await fetch(
        `http://localhost:3000/edgar/${item}/${id}.json`
      );
      const resData = await reqList.json();
      edgarData.push({ ...resData[0] });
      return edgarData;
    });

    const edgarRes = await Promise.all(edgarDataResponse);

    console.log(edgarRes)

    // console.log(edgarRes[0][0].filed)
    // console.log(edgarRes[1][0].filed)
    // console.log(edgarRes[2][0].filed)
    // console.log(edgarRes[3][0].filed)
    // console.log(edgarRes[4][0].filed)

    // edgarRes.forEach(item => {
    //   console.log(item[0].period)
    // })

    return {
      props: {
        id,
        priceData,
        edgarData: edgarRes,
      },
    };
  } catch (err: any) {
    return { props: { status: err.message } };
  }

  // console.log(edinetData);
}

const StockChart = ({ priceData, edgarData, id }) => {
  // console.log(priceData);
  // console.log(id);

  console.log(edgarData)

  if (!priceData) {
    console.log("株価データがありません");
  } else if (!edgarData) {
    console.log("Edinetデータがありません");
  }

  console.log(
    edgarData[0][0].period,
    "/ NetIncomeLoss ",
    edgarData[0][0].NetIncomeLoss_1_Q1_USD,
    "/ Assets ",
    edgarData[0][0].Assets,
    "/ EarningsPerShareBasic ",
    edgarData[0][0].EarningsPerShareBasic
  );
  console.log(
    edgarData[1][0].period,
    "/ NetIncomeLoss ",
    edgarData[1][0].NetIncomeLoss_1_FY_USD,
    "/ Assets ",
    edgarData[1][0].Assets,
    "/ EarningsPerShareBasic",
    edgarData[1][0].EarningsPerShareBasic
  );
  console.log(
    edgarData[2][0].period,
    "/ NetIncomeLoss ",
    edgarData[2][0].NetIncomeLoss_1_FY_USD,
    "/ Assets ",
    edgarData[2][0].Assets,
    "/ EarningsPerShareBasic ",
    edgarData[2][0].EarningsPerShareBasic
  );


  return (
    <div className={styles.container}>
      <main className={styles.chartBlock}>
        <div>StockChartPage {id}</div>

        {/* {priceData ? (
          <StockCandleChart priceData={priceData} edgarData={edgarData} />
        ) : (
          <p>データがありません</p>
        )} */}

        {priceData ? (
          <StockCandleChartTest priceData={priceData} />
        ) : (
          <p>データがありません</p>
        )}
      </main>
    </div>
  );
};

export default StockChart;
