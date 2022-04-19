import ReactEcharts from "echarts-for-react";

const StockCandleChart = ({ priceData, edgarData }) => {

  // 　EdgarDataの加工処理
  const newEdgarData = edgarData.map((item) => {
    const year = item.period.toString().slice(0, 4);
    const month = item.period.toString().slice(4, 6);
    const date = `${year}/${month}`;

    return {
      date: date,
      NetIncomeLoss: item.NetIncomeLoss,
      eps: item.EarningsPerShareBasic,
      operatingCashFlow: item.NetCashProvidedByUsedInOperatingActivities,
    };
  });

  // 　日付をキーとして、edinetと株価データをまとめて一つのオブジェクトにして、連想配列にする
  const companyData = priceData.map((price) => {
    return {
      date: price.date,
      open: parseInt(price.Open),
      close: parseInt(price.Close),
      low: parseInt(price.Low),
      high: parseInt(price.High),
      eps: newEdgarData.find((value) => value.date === price.date)?.eps,
      NetIncomeLoss: newEdgarData.find((value) => value.date === price.date)
        ?.NetIncomeLoss,
      operatingCashFlow: newEdgarData.find((value) => value.date === price.date)
        ?.operatingCashFlow,
    };
  });

  // 　チャート表示用配列データ作成　＝＝＝＝＝＝＝＝＝＝＝＝＝
  const newDateData = companyData.map((item) => {
    return item.date;
  });

  const newPriceData = companyData.map((item) => {
    return [
      parseInt(item.open),
      parseInt(item.close),
      parseInt(item.low),
      parseInt(item.high),
    ];
  });
  // 　理論株価計算用
  const theoryStockPrice = companyData.map((item) => {
    //資産価値
    let assetValue;

    // if (item.equityRatio >= 0.8) {
    //   assetValue = item.bps * 0.8;
    // } else if (item.equityRatio >= 0.67) {
    //   assetValue = item.bps * 0.75;
    // } else if (item.equityRatio >= 0.5) {
    //   assetValue = item.bps * 0.7;
    // } else if (item.equityRatio >= 0.33) {
    //   assetValue = item.bps * 0.65;
    // } else if (item.equityRatio >= 0.1) {
    //   assetValue = item.bps * 0.6;
    // } else {
    //   assetValue = item.bps * 0.5;
    // }

    // 事業価値
    let operationValue;

    // operationValue =
    //   (item.ordinaryProfit * 0.7) /
    //   (item.outstandingShares - item.treasuryStock);

    // if (operationValue > item.bps * 0.6) {
    //   operationValue = item.bps * 0.6;
    // }

    // 理論株価
    const theoryPrice = parseInt(item.NetIncomeLoss) / 1000000000;
    return theoryPrice;
  });

  // 営業CF係数　計算用
  const operatingCashFlowIndicator = companyData.map((item) => {
    // 営業CF係数
    const opeCashIndx = parseInt(item.operatingCashFlow) / 1000000000;

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
        name: "営業CF",
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
        smooth: true,
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
      <h2>Candle</h2>
      <ReactEcharts option={option} />
      <h3>業績データ</h3>
      <ul>
        {priceData &&
          priceData.map((item, i) => {
            return (
              <li key={i}>
                {item.date} / Close株価: {item.Close} /
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default StockCandleChart;
