import ReactEcharts from "echarts-for-react";

function CandleChart({ priceData, edinetData }) {
  
  console.log(edinetData)

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
        data: [3400, 4142, 3300],
        smooth: false,
        showSymbol: true,
        lineStyle: {
          width: 2,
        },
      },
    ],
  };
  return <ReactEcharts option={option} />;
}
export default CandleChart;
