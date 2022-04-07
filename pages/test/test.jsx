import React, { useRef, useEffect } from "react";
import dynamic from "next/dynamic";

const StockChartView = dynamic(() => import("../../components/CandleChart"), {
  ssr: false,
});

export async function getServerSideProps({ query }) {
  // const id = query.id;
  const id = 8001;
  const reqList = await fetch(`http://localhost:3000/stock/${id}.json`);
  const reqList2 = await fetch(`http://localhost:3000/edinet/${id}.json`);
  const priceData = await reqList.json();
  const edinetData = await reqList2.json();

  // console.log(query.id);

  return {
    props: {
      id,
      priceData,
      edinetData,
    },
  };
}

// export const priceData = [
//   { time: "2019-04-11", value: 80.01 },
//   { time: "2019-04-12", value: 196.63 },
//   { time: "2019-04-13", value: 76.64 },
//   { time: "2019-04-14", value: 81.89 },
//   { time: "2019-04-15", value: 74.43 },
//   { time: "2019-04-16", value: 80.01 },
//   { time: "2019-04-17", value: 96.63 },
//   { time: "2019-04-18", value: 76.64 },
//   { time: "2019-04-19", value: 81.89 },
//   { time: "2019-04-20", value: 74.43 },
// ];

// console.log(priceData)

const Index = ({priceData}) => {
  console.log("a");
  // return <StockChartView priceData={priceData} />;
  return <div>aaaa</div>;
};

export default Index;
