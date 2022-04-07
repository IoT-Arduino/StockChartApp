import React from 'react'

import CandleChart from "../../components/CandleChart";

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
    <div>
      <div>StockChartPage {id}</div>
      <CandleChart priceData={priceData} edinetData={edinetData} />
    </div>
  );
};

export default StockChart
