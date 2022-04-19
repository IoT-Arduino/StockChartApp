import React from "react";
import CandleChart from "../../components/CandleChart";
import styles from "../../styles/Home.module.css";

export async function getServerSideProps({ query }) {
  const id = query.id;

  try {
    // const reqList = await fetch(`http://localhost:3000/stock/${id}.json`);
    const reqList2 = await fetch(`http://localhost:3000/edgar/2021q3/${id}.json`);
    const reqList3 = await fetch(`http://localhost:3000/edgar/2021q4/${id}.json`);
    const reqList4 = await fetch(`http://localhost:3000/edgar/2022q1/${id}.json`);
    // const priceData = await reqList.json();
    const edgarData2:any = await reqList2.json();
    const edgarData3: any = await reqList3.json();
    const edgarData4: any = await reqList4.json();

    const edgarData: [] = []
    await edgarData.push(edgarData2, edgarData3, edgarData4);

 

    return {
      props: {
        id,
        // priceData,
        edgarData,
      },
    };
  } catch (err: any) {
    return { props: { status: err.message } };
  }

  // console.log(edinetData);
}

const StockChart = ({  edgarData, id }) => {
  // console.log(priceData)
  // console.log(edinetData)

  // if (!priceData) {
  //   console.log("株価データがありません");
  // } else if (!edgarData) {
  //   console.log("Edinetデータがありません");
  // }

  console.log(
    edgarData[0][0].period,
    "/ NetIncomeLoss ",
    edgarData[0][0].NetIncomeLoss,
    "/ Assets ",
    edgarData[0][0].Assets,
    "/ EarningsPerShareBasic ",
    edgarData[0][0].EarningsPerShareBasic
  );
  console.log(
    edgarData[1][0].period,
    "/ NetIncomeLoss ",
    edgarData[1][0].NetIncomeLoss,
    "/ Assets ",
    edgarData[1][0].Assets,
    "/ EarningsPerShareBasic",
    edgarData[1][0].EarningsPerShareBasic
  );
  console.log(
    edgarData[2][0].period,
    "/ NetIncomeLoss ",
    edgarData[2][0].NetIncomeLoss,
    "/ Assets ",
    edgarData[2][0].Assets,
    "/ EarningsPerShareBasic ",
    edgarData[2][0].EarningsPerShareBasic
  );

    console.log(
      edgarData[1][0]
    );

  return (
    <div className={styles.container}>
      <main className={styles.chartBlock}>
        <div>StockChartPage {id}</div>
        {/* {edgarData.map((item, i) => {
          return (
            <div>

            </div>
          )
        })} */}



        {/* {priceData ? (
          <CandleChart priceData={priceData} edinetData={edinetData} />
        ) : (
          <p>データがありません</p>
        )} */}
      </main>
    </div>
  );
};

export default StockChart;
