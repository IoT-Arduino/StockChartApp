import { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import EtfCandleChart from './../components/EtfCandleChart';
import EtfCompareLineChart from './../components/EtfCompareLineChart';

export async function getServerSideProps() {
  try {
    const symbol = "VOO"

    const p1 = 1420038000 // 2015/01/01 
    const p2 = 9999999999
    const range = "5d" // week "5d" , month "1mo"

    // const url = `https://query1.finance.yahoo.com/v8/finance/chart/?symbol=${symbol}&period1=${p1}&period2=${p2}&interval=${range}`
    // const reqList = await fetch(url);
    // const priceList = await reqList.json();

    const symbols = ["VOO", "VTI","VT","VIG","VYM","VWO"]
    
    const etfResponse = symbols.map(async (symbol) => {
      let reqList = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/?symbol=${symbol}&period1=${p1}&period2=${p2}&interval=${range}`)
      const etfPriceList = await reqList.json();
      return etfPriceList.chart.result[0];

    })
    const etfResponseData = await Promise.all(etfResponse);


    // console.log(etfResponseData[3].meta)
    // console.log(etfResponseData[4].meta)
    // console.log(etfResponseData[5].meta)
    // console.log(priceList.chart.result[0].indicators.adjclose)

    return {
      props: {
        fundsData: {
          vooData: etfResponseData[0],
          vtiData: etfResponseData[1],
          vtData: etfResponseData[2],
          vigData: etfResponseData[3],
          vymData: etfResponseData[4],
          vwoData: etfResponseData[5],
        }
      },
    };
  } catch (err) {
    console.log(err);
  }
}


const Home: NextPage = ({ fundsData }: any) => {
  
  console.log(fundsData.vigData)

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>StockChartApp Top</h2>
        <div>米国主要ETF（Vanguard系の比較、2014年末を起点とした成長率）</div>

        <div>
          <p>VOO,VTI,VT</p>
          <EtfCompareLineChart fundsData={fundsData} />
          <p>VOOの説明</p>
          <p>VTIの説明</p>
          <p>VTの説明</p>
          <p>主要構成銘柄（VOO,VTI,VT共通）</p>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>

        <div>
          <p>{ fundsData.vigData.meta.symbol}</p> 
          <EtfCandleChart etfData={fundsData.vigData} />
          <p>ETFの説明、構成銘柄</p>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>

        <div>
          <p>{ fundsData.vymData.meta.symbol}</p>
          <EtfCandleChart etfData={fundsData.vymData} />
          <p>ETFの説明、構成銘柄</p>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>

        <div>
          <p>{ fundsData.vwoData.meta.symbol}</p>
          <EtfCandleChart etfData={fundsData.vwoData} />
          <p>ETFの説明、構成銘柄</p>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        
        <Link href="/stocks">
          <a>株価一覧ページへ</a>
        </Link>
      </main>
    </div>
  );
};

export default Home;
