import ReactEcharts from "echarts-for-react";

function CandleChart({ priceData, edinetData }) {
  console.log(edinetData)

  //   Edinetのデータは日付を省略して月のデータにする。
  const newEdinetData = edinetData.map((item) => {
    // 年月データの加工処理。
    const year = item.endDate.toString().split("/")[0];
    // 月のデータを必ず2桁にする。
    const month =
      item.endDate.toString().split("/")[1].length === 1
        ? "0" + item.endDate.toString().split("/")[1]
        : item.endDate.toString().split("/")[1];

    return {
      stockCode: item.stockCode,
      companyName: item.companyName,
      industry: item.industry,
      per: item.per,
      bps: item.bps,
      eps: item.eps,
      outstandingShares: item.outstandingShares,
      treasuryStock: item.treasuryStock,
      equityRatio: item.equityRatio,
      ordinaryProfit: item.ordinaryProfit,
      cashFlowFromOperatingActivities: item.cashFlowFromOperatingActivities,
      date: year + "/" + month,
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

  // 　日付をキーとして、edinetと株価データをまとめて一つのオブジェクトにして、連想配列にする

  const companyData = priceData.map((price) => {
    const close = parseInt(price.close.replace(/,/g, ""));
    const bps = newEdinetData.find((value) => value.date === price.date)?.bps;
    const pbr = Math.round((close / bps) * 100) / 100;

    return {
      date: price.date,
      open: parseInt(price.open.replace(/,/g, "")),
      close: parseInt(price.close.replace(/,/g, "")),
      high: parseInt(price.high.replace(/,/g, "")),
      low: parseInt(price.low.replace(/,/g, "")),
      attribute: price.attribute,
      attributeDate: price.attributeDate,
      attributeMemo: price.attributeMemo,
      per: newEdinetData.find((value) => value.date === price.date)?.per,
      eps: newEdinetData.find((value) => value.date === price.date)?.eps,
      pbr: pbr ? pbr : null,
      bps: newEdinetData.find((value) => value.date === price.date)?.bps,

      outstandingShares: newEdinetData.find(
        (value) => value.date === price.date
      )?.outstandingShares,
      treasuryStock: newEdinetData.find((value) => value.date === price.date)
        ?.treasuryStock,
      equityRatio: newEdinetData.find((value) => value.date === price.date)
        ?.equityRatio,
      ordinaryProfit: newEdinetData.find((value) => value.date === price.date)
        ?.ordinaryProfit,

      cashFlowFromOperatingActivities: newEdinetData.find(
        (value) => value.date === price.date
      )?.cashFlowFromOperatingActivities,
    };
  });

  // console.log(companyData);

  // グラフ,テーブル表示の為の配列データを作成
  const valueStockPriceData = companyData.map((item) => {
    return item.bps * 0.5 + item.eps;
  });

  const cashFlowFromOperatingActivitiesData = companyData.map((item) => {
    return parseInt(item.cashFlowFromOperatingActivities) / 100000000;
  });

  // attribute　（株式発行情報メモ：新株落ち等）値のあるデータだけ。
  const attributeData = companyData.filter((item) => item.attribute !== null);

  // 理論株価の計算 : 書籍P242から。財務レバレッジ補正とリーマンショックルール未対応。
  const theoryStockPrice = companyData.map((item) => {
    //資産価値
    let assetValue;

    if (item.equityRatio >= 0.8) {
      assetValue = item.bps * 0.8;
    } else if (item.equityRatio >= 0.67) {
      assetValue = item.bps * 0.75;
    } else if (item.equityRatio >= 0.5) {
      assetValue = item.bps * 0.7;
    } else if (item.equityRatio >= 0.33) {
      assetValue = item.bps * 0.65;
    } else if (item.equityRatio >= 0.1) {
      assetValue = item.bps * 0.6;
    } else {
      assetValue = item.bps * 0.5;
    }

    // 事業価値
    let operationValue;

    operationValue =
      (item.ordinaryProfit * 0.7) /
      (item.outstandingShares - item.treasuryStock); 
    
    if (operationValue > item.bps * 0.6) {
      operationValue = item.bps * 0.6;
    }     

    // 理論株価
    const theoryPrice = assetValue + operationValue;

    return theoryPrice;
  });


  // console.log(theoryStockPrice);


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
        interval: 500,
        axisLabel: {
          formatter: "{value} 円",
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
          formatter: "{value} 億円",
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
        data: cashFlowFromOperatingActivitiesData,
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
                {item.date} / Close株価: {item.close} /
                {item.per && `PER:${item.per}`}/
                {item.eps && `EPS:${item.eps}円`}/
                {item.pbr && `PBR:${item.pbr}`}/{item.bps && `BPS:${item.bps}`}
              </li>
            );
          })}
      </ul>
      <h3>株式発行情報</h3>
      <ul>
        {attributeData &&
          attributeData.map((attr, i) => {
            return (
              <li key={i}>
                {attr.attribute}
                {attr.attributeDate}
                {attr.attributeMemo}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
export default CandleChart;
