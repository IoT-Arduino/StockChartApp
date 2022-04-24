import ReactEcharts from "echarts-for-react";
import { calcEdgarData } from "../functions/CalcEdgarData";

const StockCandleChart = ({ priceData, edgarData }) => {
  const edgarFsData = calcEdgarData(edgarData);
  // console.log(edgarFsData);

  //　EdgarDataの加工処理
  const newEdgarData = edgarFsData.map((item) => {
    return {
      date: item.date,
      NetIncomeLossAccum: item.NetIncomeLossAccum,
      NetIncomeLoss: item.NetIncomeLoss,
      stockHoldersEquityRatio: parseFloat(
        item.stockHoldersEquity / item.assets
      ).toFixed(2),
      assets: item.assets,
      stockHoldersEquity: item.stockHoldersEquity,
      commonStockSharesOutstanding: item.commonStockSharesOutstanding,
      bps: parseFloat(
        item.stockHoldersEquity / item.commonStockSharesOutstanding
      ).toFixed(2),
      eps: item.eps,
      operatingCashFlow: item.operatingCashFlowAccum,
    };
  });

  // console.log(newEdgarData);

  // 　日付をキーとして、edinetと株価データをまとめて一つのオブジェクトにして、連想配列にする
  const companyData = priceData.map((price) => {
    return {
      date: price.date,
      // Price Data
      open: parseFloat(price.Open).toFixed(2),
      close: parseFloat(price.Close).toFixed(2),
      low: parseFloat(price.Low).toFixed(2),
      high: parseFloat(price.High).toFixed(2),
      // EdgarData
      NetIncomeLossAccum: newEdgarData.find(
        (value) => value.date === price.date
      )?.NetIncomeLossAccum,
      NetIncomeLoss: newEdgarData.find((value) => value.date === price.date)
        ?.NetIncomeLoss,
      operatingCashFlow: newEdgarData.find((value) => value.date === price.date)
        ?.operatingCashFlow,
      bps: newEdgarData.find((value) => value.date === price.date)?.bps,
      eps: newEdgarData.find((value) => value.date === price.date)?.eps,
      commonStockSharesOutstanding: newEdgarData.find(
        (value) => value.date === price.date
      )?.commonStockSharesOutstanding,
      stockHoldersEquityRatio: newEdgarData.find(
        (value) => value.date === price.date
      )?.stockHoldersEquityRatio,
      // BSデータ検証用
      stockHoldersEquity: newEdgarData.find(
        (value) => value.date === price.date
      )?.stockHoldersEquity,
      assets: newEdgarData.find((value) => value.date === price.date)?.assets,
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
  // 　理論株価計算用
  const theoryStockPrice = companyData.map((item) => {


    //資産価値 はっしゃんさん
    let assetValue;
    if (item.stockHoldersEquityRatio >= 0.8) {
      assetValue = item.bps * 0.8;
    } else if (item.stockHoldersEquityRatio >= 0.67) {
      assetValue = item.bps * 0.75;
    } else if (item.stockHoldersEquityRatio >= 0.5) {
      assetValue = item.bps * 0.7;
    } else if (item.stockHoldersEquityRatio >= 0.33) {
      assetValue = item.bps * 0.65;
    } else if (item.stockHoldersEquityRatio >= 0.1) {
      assetValue = item.bps * 0.6;
    } else {
      assetValue = item.bps * 0.5;
    }

    // 事業価値　暫定PERの15倍
    const operationValue = parseFloat(item.eps) * 15;

    // 事業価値 はっしゃんさん
    // let operationValue;
    // operationValue =
    //   (item.ordinaryProfit * 0.7) /
    //   (item.outstandingShares - item.treasuryStock);

    // if (operationValue > item.bps * 0.6) {
    //   operationValue = item.bps * 0.6;
    // }

    // 理論株価
    const theoryPrice = assetValue + operationValue;
    return theoryPrice;
  });

  // console.log(theoryStockPrice);

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
        left: "10%",
        right: "10%",
        top: 60,
        height: 120,
      },
      {
        left: "10%",
        right: "10%",
        height: 40,
        top: 240,
      },
    ],
    yAxis: [
      {
        name: "株価",
        scale: true,
        // min: 'dataMin' - 1500,
        // max: 'dataMax' + 1500,
        interval: 50,
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
      },
      {
        name: "DummyData",
        type: "line",
        data: theoryStockPrice,
        smooth: false,
        showSymbol: true,
        xAxisIndex: 0,
        yAxisIndex: 0,
        lineStyle: {
          width: 2,
        },
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
      <ReactEcharts option={option} />
      <h3>業績データ</h3>
      <ul>
        {companyData &&
          companyData.map((item, i) => {
            return (
              <li key={i}>
                {item.date} / Close株価: {item.close} / NetIncomeLoss:
                {item.NetIncomeLoss / 1000000} / OperatingCashFlow:
                {item.operatingCashFlow / 1000000}/ BPS:{item.bps} / EPS:
                {item.eps} / CShare:
                {item.commonStockSharesOutstanding / 1000000} / Assets:
                {item.assets / 1000000} / Equity:
                {item.stockHoldersEquity / 1000000}
              </li>
            );
          })}
        <p>単位は(million)</p>
      </ul>
    </div>
  );
};

export default StockCandleChart;
