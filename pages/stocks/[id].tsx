import React from "react";
import CandleChart from "../../components/CandleChart";
import styles from "../../styles/Home.module.css";

export async function getServerSideProps({ query }) {
  const id = query.id;

  try {
    const reqList = await fetch(`http://localhost:3000/stock/${id}.json`);
    const reqList2 = await fetch(`http://localhost:3000/edinet/${id}.json`);
    const priceData = await reqList.json();
    const edinetData = await reqList2.json();

    return {
      props: {
        id,
        priceData,
        edinetData,
      },
    };
  } catch (err: any) {
    return { props: { status: err.message } };
  }

  // console.log(edinetData);
}

const StockChart = ({ priceData, edinetData, id }) => {
  // console.log(priceData)
  // console.log(edinetData)

  if (!priceData) {
    console.log("株価データがありません");
  } else if (!edinetData) {
    console.log("Edinetデータがありません");
  }

  return (
    <div className={styles.container}>
      <main className={styles.chartBlock}>
        <div>StockChartPage {id}</div>

        {priceData ? (
          <CandleChart priceData={priceData} edinetData={edinetData} />
        ) : (
          <p>データがありません</p>
        )}
      </main>
    </div>
  );
};

export default StockChart;
