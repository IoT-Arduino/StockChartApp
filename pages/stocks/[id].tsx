import React from 'react'
import CandleChart from "../../components/CandleChart";
import styles from "../../styles/Home.module.css";

export async function getServerSideProps({ query }) {

  const id = query.id
  const reqList = await fetch(`http://localhost:3000/stock/${id}.json`);
  const reqList2 = await fetch(`http://localhost:3000/edinet/${id}.json`);
  const priceData = await reqList.json();
  const edinetData = await reqList2.json();

  // console.log(edinetData);

  return {
    props: {
      id,
      priceData,
      edinetData,
    },
  };
}

const StockChart = ({ priceData,edinetData,id }) => {
  // console.log(priceData)
  // console.log(edinetData)

  return (
    <div className={styles.container}>
      <main className={styles.chartBlock}>
        <div>StockChartPage {id}</div>
        <CandleChart priceData={priceData} edinetData={edinetData} />
      </main>
    </div>
  );
};

export default StockChart
