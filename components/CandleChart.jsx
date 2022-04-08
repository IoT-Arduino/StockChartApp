import ReactEcharts from "echarts-for-react";

function CandleChart({ priceData, edinetData }) {
  //   Edinetのデータは日付を省略して月のデータにする。

  const newEdinetData = edinetData.map((item) => {
    return {
      stockCode: item.stockCode,
      per: item.per,
      cashFlowFromOperatingActivities: item.cashFlowFromOperatingActivities,
      date:
        item.endDate.toString().split("/")[0] +
        "/" +
        item.endDate.toString().split("/")[1],
    };
  });

  // 株価データの処理
  let result = priceData.sort(function (a, b) {
    return a.date < b.date ? -1 : 1; //オブジェクト 日付での昇順ソート
  });

  const newDateData = result.map((item) => {
    return item.date;
  });

  const newPriceData = result.map((item) => {
    return [
      parseInt(item.open.replace(/,/g, "")),
      parseInt(item.close.replace(/,/g, "")),
      parseInt(item.low.replace(/,/g, "")),
      parseInt(item.high.replace(/,/g, "")),
    ];
  });

  const volumes = [86160000, 79330000, 102600000];

  // 　日付をキーとして、edinetと株価データをまとめて一つのオブジェクトにして、連想配列にする。
  // edinetの月　と　priceDataの月　2桁になるように注意。
  // priceDataが整備されたのち改めて確認する！！　
  //　1376のデータ加工で暫定テスト中
  
  // console.log(newEdinetData[4].date);
  // console.log(priceData[0].date);
  
  console.log(priceData)

  const companyData = priceData.map((price) => {
    return {
      date: price.date,
      open: parseInt(price.open.replace(/,/g, "")),
      close: parseInt(price.close.replace(/,/g, "")),
      high:  parseInt(price.high.replace(/,/g, "")),
      low:  parseInt(price.low.replace(/,/g, "")),
      per: newEdinetData.find((value) => value.date === price.date)?.per,
      cashFlowFromOperatingActivities: newEdinetData.find(
        (value) => value.date === price.date
      )?.cashFlowFromOperatingActivities,
    };
  });

  const perData = companyData.map((item) => {
    return item.per * 100;
  });

  console.log(perData);

  const option = {
    xAxis: {
      data: newDateData,
    },
    grid: {
      left: "10%",
      right: "10%",
      bottom: "15%",
    },
    yAxis: [
      {
        scale: true,
        splitArea: {
          show: true,
        },
      },
      {
        scale: true,
        splitNumber: 3,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
      },
    ],
    series: [
      {
        type: "candlestick",
        data: newPriceData,
      },
      {
        name: "DummyData",
        type: "line",
        data: perData,
        smooth: false,
        showSymbol: true,
        lineStyle: {
          width: 2,
        },
      },
    ],
  };
  return (
    <div>
      <ReactEcharts option={option} />
      <p>PER:</p>
    </div>
  );
}
export default CandleChart;
