import React from 'react'
import dynamic from "next/dynamic";

const StockChartView = dynamic(() => import("../components/ChartComponent.jsx"), {
  ssr: false,
});

export async function getServerSideProps({ query }) {

  const id = query.id
  const reqList = await fetch(`http://localhost:3000/stock/${id}.json`);
  const reqList2 = await fetch(`http://localhost:3000/edinet/${id}.json`);
  const priceData = await reqList.json();
  const edinetData = await reqList2.json();

  console.log(query.id)

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
    <>
      <div>StockChartPage {id}</div>

      {/*  <StockChartView priceData={priceData} /> */}
    </>
  );
};

export default StockChart
