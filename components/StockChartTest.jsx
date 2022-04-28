import ReactEcharts from "echarts-for-react";
import { calcEdgarData } from "../functions/CalcEdgarData";
import {createMarkerData} from "../functions/CreateMarkerData"

const StockCandleChart = ({ priceData, edgarData , markerData}) => {
  // console.log(edgarData)
  const edgarFsData = calcEdgarData(edgarData);
  console.log(edgarFsData);
  const markerTempData = createMarkerData(markerData)

  const markerChartData = markerTempData.map((item,i)=>{
    const closePrice = (priceData.find((value) => value.date === item.date)?.Close)*1.2
    return ({
      value: item.value,
      coord:[item.date,closePrice],
      name:item.name,
      date: item.date,
      itemStyle: {
        color: 'rgb(41,60,85)'
      }
    })
  })
  
  //　EdgarDataの加工処理
  const newEdgarData = edgarFsData.map((item) => {
    return {
      date: item.date,
      fp: item.fp,
      // PL
      revenue:item.revenue,
      revenueAccum:item.revenueAccum,
      NetIncomeLoss: item.NetIncomeLoss,
      NetIncomeLossAccum: item.NetIncomeLossAccum,
      // CFS
      operatingCashFlow: item.operatingCashFlow,
      operatingCashFlowAccum: item.operatingCashFlowAccum,
      // BS
      assets: item.assets,
      stockHoldersEquity: item.stockHoldersEquity,
      // 株式指標・経営指標
      commonStockSharesOutstanding: item.commonStockSharesOutstanding,
      weightedAverageNumberOfDilutedSharesOutstanding: item.weightedAverageNumberOfDilutedSharesOutstanding,
      // Yahoo Finance と一致する。commonStockSharesOutstanding　を使用。
      bps: parseFloat(
        item.stockHoldersEquity / item.commonStockSharesOutstanding
      ).toFixed(2),
      // EPSはBasicを使用（データがそろっている、YahooFinanceと同じ、株探USはDiluted）
      eps: parseFloat(item.eps).toFixed(2),
      epsAccum: parseFloat(item.epsAccum).toFixed(2),
      epsDiluted: parseFloat(item.epsDiluted).toFixed(2),
      epsAccumDiluted: parseFloat(item.epsAccumDiluted).toFixed(2),
      stockHoldersEquityRatio: parseFloat(
        item.stockHoldersEquity / item.assets
      ).toFixed(2),
    };
  });

  // 　日付をキーとして、edinetと株価データをまとめて一つのオブジェクトにして、連想配列にする
  const companyData = priceData.map((price) => {
    return {
      date: price.date,
      fp:newEdgarData.find((value) => value.date === price.date)?.fp,
      // Price Data ---------------
      open: parseFloat(price.Open).toFixed(2),
      close: parseFloat(price.Close).toFixed(2),
      low: parseFloat(price.Low).toFixed(2),
      high: parseFloat(price.High).toFixed(2),
      // EdgarData ----------------
      // PL
      revenue: newEdgarData.find((value) => value.date === price.date)
        ?.revenue,
      revenueAccum: newEdgarData.find((value) => value.date === price.date)
        ?.revenueAccum,
      NetIncomeLoss: newEdgarData.find((value) => value.date === price.date)
        ?.NetIncomeLoss,
      NetIncomeLossAccum: newEdgarData.find(
        (value) => value.date === price.date
      )?.NetIncomeLossAccum,
      // CFS
      operatingCashFlow: newEdgarData.find((value) => value.date === price.date)
        ?.operatingCashFlow,
      operatingCashFlowAccum: newEdgarData.find((value) => value.date === price.date)
        ?.operatingCashFlowAccum,
      // BS
      stockHoldersEquity: newEdgarData.find(
        (value) => value.date === price.date
      )?.stockHoldersEquity,
      assets: newEdgarData.find((value) => value.date === price.date)?.assets,      
      
      // 株式指標、経営指標
      commonStockSharesOutstanding: newEdgarData.find(
        (value) => value.date === price.date
      )?.commonStockSharesOutstanding,
      weightedAverageNumberOfDilutedSharesOutstanding: newEdgarData.find(
        (value) => value.date === price.date
      )?.weightedAverageNumberOfDilutedSharesOutstanding,

      bps: newEdgarData.find((value) => value.date === price.date)?.bps,
      pbr: parseFloat(
        price.Close /
          newEdgarData.find((value) => value.date === price.date)?.bps
      ).toFixed(2),
      eps: newEdgarData.find((value) => value.date === price.date)?.eps,
      epsAccum: newEdgarData.find((value) => value.date === price.date)?.epsAccum,
      epsDiluted: newEdgarData.find((value) => value.date === price.date)?.epsDiluted,
      epsAccumDiluted: newEdgarData.find((value) => value.date === price.date)?.epsAccumDiluted,
      per:  parseFloat(
        price.Close /
          newEdgarData.find((value) => value.date === price.date)?.eps
      ).toFixed(2),
      perAccum:  parseFloat(
        price.Close /
          newEdgarData.find((value) => value.date === price.date)?.epsAccum
      ).toFixed(2),

      stockHoldersEquityRatio: newEdgarData.find(
        (value) => value.date === price.date
      )?.stockHoldersEquityRatio,

    };
  });

  // console.log(companyData);

  // 　チャート表示用配列データ作成　＝＝＝＝＝＝＝＝＝＝＝＝＝

  const newDateData = companyData.map((item) => {
    return item.date;
  });

  const newPriceData = companyData.map((item) => {
    return [item.open, item.close, item.low, item.high];
  });

  // 　理論株価　資産価値計算用
  const theoryStockPriceAsset = companyData.map((item, i) => {
    //資産価値 はっしゃんさん
    let assetValueWithRatio;
    if (item.stockHoldersEquityRatio >= 0.8) {
      assetValueWithRatio = item.bps * 0.8;
    } else if (item.stockHoldersEquityRatio >= 0.67) {
      assetValueWithRatio = item.bps * 0.75;
    } else if (item.stockHoldersEquityRatio >= 0.5) {
      assetValueWithRatio = item.bps * 0.7;
    } else if (item.stockHoldersEquityRatio >= 0.33) {
      assetValueWithRatio = item.bps * 0.65;
    } else if (item.stockHoldersEquityRatio >= 0.1) {
      assetValueWithRatio = item.bps * 0.6;
    } else {
      assetValueWithRatio = item.bps * 0.5;
    }

    return assetValueWithRatio;
  });

  // 　理論株価　事業価値計算用
  const theoryStockPriceOperation = companyData.map((item, i) => {
    // 事業価値　暫定PERの15倍 単四半期EPSベースなので4倍している。
    const operationValue = parseFloat(item.epsDiluted) * 15 * 4;

    // 事業価値 はっしゃんさん
    // let operationValue;
    // operationValue =
    //   (item.ordinaryProfit * 0.7) /
    //   (item.outstandingShares - item.treasuryStock);

    // if (operationValue > item.bps * 0.6) {
    //   operationValue = item.bps * 0.6;
    // }

    // 理論株価
    return operationValue;
  });



  // 理論株価　空白期間穴埋め処理（直近四半期のデータをコピー）
  const newTheoryStockPriceAsset = theoryStockPriceAsset;
  const resultTheoryStockPriceAsset = [];
  for (let i = 0; i < newTheoryStockPriceAsset.length; i++) {
    if (i === 0) {
      newTheoryStockPriceAsset[i] = 0;
    } else if (isNaN(newTheoryStockPriceAsset[i])) {
      newTheoryStockPriceAsset[i] = newTheoryStockPriceAsset[i-1];
    } else {
      newTheoryStockPriceAsset[i] = newTheoryStockPriceAsset[i]
    }
    // 理論株価　マイナスの値は０にする。
    if (newTheoryStockPriceAsset[i] < 0) {
      newTheoryStockPriceAsset[i] = 0
    }

    resultTheoryStockPriceAsset.push(newTheoryStockPriceAsset[i])
  }

  const newTheoryStockPriceOperation = theoryStockPriceOperation;
  const resultTheoryStockPriceOperation = [];
  for (let i = 0; i < newTheoryStockPriceOperation.length; i++) {
    if (i === 0) {
      newTheoryStockPriceOperation[i] = 0;
    } else if (isNaN(newTheoryStockPriceOperation[i])) {
      newTheoryStockPriceOperation[i] = newTheoryStockPriceOperation[i-1];
    } else {
      newTheoryStockPriceOperation[i] = newTheoryStockPriceOperation[i]
    }
    // 理論株価　マイナスの値は０にする。
    if (newTheoryStockPriceOperation[i] < 0) {
      newTheoryStockPriceOperation[i] = 0
    }

    resultTheoryStockPriceOperation.push(newTheoryStockPriceOperation[i])
  }


  // ダミー利益　計算用 グラフ表示
  const netIncomeAccumData = companyData.map((item) => {
    const netIncomeAccumArr = parseInt(item.NetIncomeLossAccum) / 10000000;
    return netIncomeAccumArr;
  });

  const netIncomeData = companyData.map((item) => {
    const netIncomeArr = parseInt(item.NetIncomeLoss) / 10000000;
    return netIncomeArr;
  });

  const bps = companyData.map((item) => {
    const bpsArr = parseInt(item.bps);
    return bpsArr;
  });

  // 営業CF係数　計算用
  const operatingCashFlowIndicator = companyData.map((item) => {
    // 営業CF係数
    const opeCashIndx = parseInt(item.operatingCashFlow) / 10000000;

    return opeCashIndx;
  });

  // テーブル表示用　ソート（最新データが上に）
  const companyDataForTable = companyData.sort(function (a, b) {
    return a.date > b.date ? -1 : 1;
  });

  //  通期業績データ
  const fyCompanyDataForTable = companyDataForTable.filter(item=>{
    return item.fp == "FY"
  })

　// 単四半期業績データ
  const QtrCompanyDataForTable = companyDataForTable.filter(item => {
    const QTR = ["Q1","Q2","Q3","FY"]
    return  QTR.includes(item.fp)
  })


  // Chart Option
  const option = {
    xAxis: [
      {
        data: newDateData,
        gridIndex: 0,

      },
      {
        data: newDateData,
        gridIndex: 1,
      },
    ],
    grid: [
      {
        left: "15%",
        right: "10%",
        top: 50,
        height: '50%',
      },
      {
        left: "15%",
        right: "10%",
        height: '20%',
        top: '72%',
        },
    ],
    yAxis: [
      {
        name: "株価",
        scale: true,
        // interval: 100,
        axisLabel: {
          formatter: "{value} USD",
        },
        splitArea: {
          show: true,
        },
        axisPointer: {
          show: true,
        },
      },
      {
        name: "営業CF（百万ドル）",
        scale: true,
        splitNumber: 1,
        gridIndex: 1,
        axisLabel: { show: true },
        axisLabel: {
          formatter: "{value} USD",
        },
        axisLine: { show: true },
        axisTick: { show: true },
        splitLine: { show: true },
      },
    ],
    series: [
      {
        type: "candlestick",
        data: newPriceData,
        grid: 0,
        xAxisIndex: 0,
        yAxisIndex: 0,
        markPoint: {
          label: {},
          data:markerChartData
        }
      },
    {
      name: '理論株価-資産',
      type: 'line',
      stack: 'Total',
              xAxisIndex: 0,
        yAxisIndex: 0,
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
        data: resultTheoryStockPriceAsset,
        smooth: true,
      },
        {
      name: '理論株価-事業',
      type: 'line',
      stack: 'Total',
              xAxisIndex: 0,
        yAxisIndex: 0,
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
          data: resultTheoryStockPriceOperation,
      smooth: true,
    },

      {
        name: "Volume",
        type: "bar",
        grid: 1,
        xAxisIndex: 1,
        yAxisIndex: 1,
        itemStyle: {
          color: "#7fbe9e",
        },
        emphasis: {
          itemStyle: {
            color: "#140",
          },
        },
        data: operatingCashFlowIndicator,
      },
    ],
  };

  return (
    <div>
      <ReactEcharts option={option} style={{ height: '600px', width: '100%' }} />
      <h3>通期業績データ</h3>
      <ul>
        {fyCompanyDataForTable &&
          fyCompanyDataForTable.map((item, i) => {
            return (
              <li key={i}>
                {item.date} /
                Close株価:{item.close} /
                RevenueAccum:{item.revenueAccum / 1000000} /
                NetIncomeLossAccum:{item.NetIncomeLossAccum / 1000000} /
                OperatingCashFlowAccum: {item.operatingCashFlowAccum / 1000000}/
                BPS:{item.bps} /
                PBR:{item.pbr} /
                EPS-Accum:{item.epsAccum} /
                PER-Accum:{item.perAccum} /
                Assets:{item.assets / 1000000} /
                Equity:{item.stockHoldersEquity / 1000000}
              </li>
            );
          })}
        <p>単位は(million)</p>
      </ul>
      <h3>単四半期業績データ</h3>
      <ul>
        {QtrCompanyDataForTable &&
          QtrCompanyDataForTable.map((item, i) => {
            return (
              <li key={i}>
                {item.date} /
                Close株価: {item.close} /
                Revenue:{item.revenue / 1000000} /
                NetIncomeLoss:{item.NetIncomeLoss / 1000000} /
                OperatingCashFlow:
                {item.operatingCashFlow / 1000000}/
                BPS:{item.bps} /
                PBR:{item.pbr} /
                EPS:{item.eps} /
                Assets:{item.assets / 1000000} /
                Equity:{item.stockHoldersEquity / 1000000} / 
                StockNum:{item.commonStockSharesOutstanding}
              </li>
            );
          })}
        <p>単位は(million)</p>
      </ul>
    </div>
  );
};

export default StockCandleChart;
