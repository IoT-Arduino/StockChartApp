import ReactEcharts from "echarts-for-react";
import { calcEdgarData } from "../functions/CalcEdgarData";
import styles from "../styles/Home.module.css";

const StockCandleChart =({ priceData, edgarData, marker,id }) => {

  // console.log(edgarData)
  
  const edgarFsData = calcEdgarData(edgarData);

  const markerChartData = marker.map((item,i)=>{
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
    
    // 掛け持ち表示対応、株式数　epsBasic と Diluted (Dilutedを基本になければ、Basicとして、チャート表示とテーブル表示に対応する)
    const epsBasicAndDiluted = (item.epsDiluted ? item.epsDiluted : item.eps)
    const epsBasicAndDilutedAccum = (item.epsAccumDiluted ? item.epsAccumDiluted : item.epsAccum)
    const numberOfSharesOutstanding = (item.weightedAverageNumberOfDilutedSharesOutstanding? item.weightedAverageNumberOfDilutedSharesOutstanding:item.commonStockSharesOutstanding )
    const bookPerShare = ( item.stockHoldersEquity / numberOfSharesOutstanding )

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
      numberOfSharesOutstanding:numberOfSharesOutstanding,
      commonStockSharesOutstanding:item.commonStockSharesOutstanding,
      weightedAverageNumberOfDilutedSharesOutstanding: item.weightedAverageNumberOfDilutedSharesOutstanding,

      // Yahoo Finance と一致する。commonStockSharesOutstanding　を使用。
      bps: parseFloat(bookPerShare).toFixed(2),
      // EPSはBasicを使用（データがそろっている、YahooFinanceと同じ、株探USはDiluted）
      eps: parseFloat(epsBasicAndDiluted).toFixed(2),
      epsAccum: parseFloat(epsBasicAndDilutedAccum).toFixed(2),
      // epsDiluted: parseFloat(item.epsDiluted).toFixed(2),
      // epsAccumDiluted: parseFloat(item.epsAccumDiluted).toFixed(2),
      stockHoldersEquityRatio: parseFloat(
        item.stockHoldersEquity / item.assets
      ).toFixed(2),
      // 配当関係　ｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰ
      // 一株当たり配当　DPS
      // commonStockDividendsPerShareDeclaredDeducted: item.commonStockDividendsPerShareDeclaredDeducted,
      // commonStockDividendsPerShareDeclaredYear: item.commonStockDividendsPerShareDeclaredYear,
      // 配当性向　    四半期の場合、直近四半期の1株配当×4　 ÷ 直近4四半期の調整後希薄化EPS
      // dividendPayoutRatio: parseFloat(item.commonStockDividendsPerShareDeclaredDeducted / item.eps).toFixed(2),
      // dividendPayoutRatioYear: parseFloat(item.commonStockDividendsPerShareDeclaredYear / item.epsAccum).toFixed(2),
    };
  });



  // 　日付をキーとして、edinet、markerData,splitDataと株価データをまとめて一つのオブジェクトにして、連想配列にする
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
      
      // 経営指標
      stockHoldersEquityRatio: newEdgarData.find(
        (value) => value.date === price.date
      )?.stockHoldersEquityRatio,
      
      // 株式指標   price.calcRatio で調整する。ｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰ
      // 株式数　分割の場合、株数は過去の株数に掛け算する。。
      numberOfSharesOutstanding: newEdgarData.find(
        (value) => value.date === price.date
      )?.numberOfSharesOutstanding * price.calcRatio,

      commonStockSharesOutstanding: newEdgarData.find(
        (value) => value.date === price.date
      )?.commonStockSharesOutstanding * price.calcRatio,

      weightedAverageNumberOfDilutedSharesOutstanding: newEdgarData.find(
        (value) => value.date === price.date
      )?.weightedAverageNumberOfDilutedSharesOutstanding * price.calcRatio,

      // 一株あたり経営指標　分割の場合、EPS等は過去を割る
      bps: parseFloat(newEdgarData.find((value) => value.date === price.date)?.bps/price.calcRatio).toFixed(2),
      eps: parseFloat(newEdgarData.find((value) => value.date === price.date)?.eps/price.calcRatio).toFixed(2),
      epsAccum: parseFloat(newEdgarData.find((value) => value.date === price.date)?.epsAccum/price.calcRatio).toFixed(2),
      // epsDiluted: newEdgarData.find((value) => value.date === price.date)?.epsDiluted/price.calcRatio,
      // epsAccumDiluted: newEdgarData.find((value) => value.date === price.date)?.epsAccumDiluted/price.calcRatio,

      // 株価指標　株式分割調整。（要確認）
      pbr: parseFloat(
        (price.Close /
          newEdgarData.find((value) => value.date === price.date)?.bps)* price.calcRatio
      ).toFixed(2),
      per:  parseFloat(
        (price.Close /
          newEdgarData.find((value) => value.date === price.date)?.eps)* price.calcRatio
      ).toFixed(2),
      perAccum:  parseFloat(
        (price.Close /
          newEdgarData.find((value) => value.date === price.date)?.epsAccum ) * price.calcRatio
      ).toFixed(2),


      // 配当関係　ｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰ
      // 一株当たり配当　DPS
      // commonStockDividendsPerShareDeclaredDeducted: newEdgarData.find(
      //   (value) => value.date === price.date
      // )?.commonStockDividendsPerShareDeclaredDeducted,

      // commonStockDividendsPerShareDeclaredYear: newEdgarData.find(
      //   (value) => value.date === price.date
      // )?.commonStockDividendsPerShareDeclaredYear,

      // 配当利回り(FYのみ表示対象とする)
      // dividendYieldDeducted:parseFloat(newEdgarData.find(
      //   (value) => value.date === price.date
      // )?.commonStockDividendsPerShareDeclaredDeducted / price.Close).toFixed(2),
      // dividendYieldYear:parseFloat(newEdgarData.find(
      //   (value) => value.date === price.date
      // )?.commonStockDividendsPerShareDeclaredYear/price.Close).toFixed(2),

      // 配当性向
      // dividendPayoutRatio: newEdgarData.find(
      //   (value) => value.date === price.date
      // )?.dividendPayoutRatio,

      // dividendPayoutRatioYear: newEdgarData.find(
      //   (value) => value.date === price.date
      // )?.dividendPayoutRatioYear,

    };
  });

   console.log(companyData)

  // console.log(edgarData)

  // 　チャート表示用配列データ作成　＝＝＝＝＝＝＝＝＝＝＝＝＝

  //   チャートの左端きれいにする為のslice処理。
  // まず、companyDataに最初の値が存在するIndexを取得　fpがundefinedのもの（理論事業価値の計算揃えの為＋3する）
  const firstEdgarIndex = companyData.findIndex(item=>item.fp != undefined) +3
  // そのIndexをつかって以下の配列をSlice
  const slicedCompanyData = companyData.slice(firstEdgarIndex)
  
  const newDateData = slicedCompanyData.map((item,i) => {
    return item.date;
  });

  const newPriceData = slicedCompanyData.map((item) => {
    return [item.open, item.close, item.low, item.high];
  });

  // 　理論株価　資産価値計算用　/ map用の配列はcompanyDataを使うこと(slicedを使わない)
  const theoryStockPriceAsset = companyData.map((item, i) => {
    const assetValueWithRatio = item.bps 
    return assetValueWithRatio;
  });


  const newTheoryStockPriceAsset = theoryStockPriceAsset;
  const resultTheoryStockPriceAsset = []; 
  for (let i = 0; i < newTheoryStockPriceAsset.length; i++) {
    if (isNaN(newTheoryStockPriceAsset[i])) {
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
  const slicedResultTheoryStockPriceAsset = resultTheoryStockPriceAsset.slice(firstEdgarIndex)

  // 　理論株価　事業価値計算用 / map用の配列はcompanyDataを使うこと(slicedを使わない)
  const theoryStockPriceOperation = companyData.map((item, i) => {
    // 事業価値　暫定PERの15倍 単四半期EPSベースなので4倍している。
    const operationValue = parseFloat(item.eps) * 15 * 4 ;
    // 理論株価
    return operationValue;
  });

    const newTheoryStockPriceOperation = theoryStockPriceOperation;
    const resultTheoryStockPriceOperation = []; 
    for (let i = 0; i < newTheoryStockPriceOperation.length; i++) {
      if (isNaN(newTheoryStockPriceOperation[i])) {
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
  
  const slicedResultTheoryStockPriceOperation = resultTheoryStockPriceOperation.slice(firstEdgarIndex)


  //　キャッシュフロー棒グラフエリア用 ---------------------------------------
  //  一旦四半期データのみにフィルタする処理
 
  const filteredDataForBarChart = slicedCompanyData.filter((item,i) => {
    return item.operatingCashFlow != null
  })

  const filteredDateForBarChart = filteredDataForBarChart.map((item) => {
    const dateData = item.date;
    return dateData;
  });
  const operatingCashFlowIndicator = filteredDataForBarChart.map((item) => {
    const opeCashIndx = (parseFloat(item.operatingCashFlow/item.revenue)*100).toFixed(2);
    return opeCashIndx;
  });

  const operatingCashFlowData = filteredDataForBarChart.map((item) => {
    const opeCashData = parseInt(item.operatingCashFlow) / 10000000;
    return opeCashData;
  });

  const netIncomeArr = filteredDataForBarChart.map((item) => {
    const netIncomeData = parseInt(item.NetIncomeLoss) / 10000000;
    return netIncomeData;
  });




  // テーブル表示用　データ処理　------------------------------

  const companyDataForTable =  slicedCompanyData.slice().sort(function (a, b) {
    return a.date > b.date ? -1 : 1;
  });

  //  通期業績データ
  const fyCompanyDataForTable = companyDataForTable.filter(item => {
    return item.fp == "FY"
  })

　// 単四半期業績データ
  const QtrCompanyDataForTable = companyDataForTable.filter(item => {
    const QTR = ["Q1","Q2","Q3","FY"]
    return  QTR.includes(item.fp)
  })

  //==============================================================


  // Chart Option
  const option = {
    xAxis: [
      {
        data: newDateData,
        gridIndex: 0,

      },
      {
        data: filteredDateForBarChart,
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
        name: "営業CF(緑) : 純利益（黄）　（百万ドル）",
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
      {
        name: "営業CFマージン",
        scale: true,
        splitNumber: 1,
        gridIndex: 1,
        axisLabel: { show: true },
        axisLabel: {
          formatter: "{value} %",
        },
        axisLine: { show: true },
        axisTick: { show: true },
        splitLine: { show: true },
        min:0,
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
      showSymbol: false,
      lineStyle: {
        color: '#5470C6',
        width: 1
      },
      areaStyle: {
        opacity: 0.2
      },
      emphasis: {
        focus: 'series'
      },
        data: slicedResultTheoryStockPriceAsset,
        smooth: true,
      },
      {
        name: '理論株価-事業',
        type: 'line',
        stack: 'Total',
        xAxisIndex: 0,
        yAxisIndex: 0,
        showSymbol: false,
        lineStyle: {
          color: '#7fbe9e',
          width: 1
        },
        areaStyle: {
          opacity:0.2
        },
        emphasis: {
          focus: 'series'
        },
        data: slicedResultTheoryStockPriceOperation,
        smooth: true,
      },
      {
        name: "Cashflow",
        type: "bar",
        barGap: 0,
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
        data: operatingCashFlowData,
      },
    {
      name: "NetIncome",
      type: "bar",
      grid: 1,
      xAxisIndex: 1,
      yAxisIndex: 1,
      itemStyle: {
        color: "#ffec50",
      },
      emphasis: {
        itemStyle: {
          color: "#140",
        },
      },
      data: netIncomeArr,
      },
      {
      name: "CFMargin",
      type: "line",
      grid: 1,
      xAxisIndex: 1,
      yAxisIndex: 2,
      itemStyle: {
        color: "#636363",
      },
      data: operatingCashFlowIndicator,
    },
    ],
  };



  return (
    <div>
      <ReactEcharts option={option} style={{ height: '600px', width: '100%' }} />
      <p style={{ textAlign: 'right' }}>単位は(Thousand)</p>
      <h3>通期業績データ FS</h3>

      <table className={styles.table}>
        <thead>
        <tr>
          <th>年月</th>
          <th>売上高</th>
          <th>純利益</th>
          <th>営業CF</th>
          <th>総資産</th>
          <th>株主資本</th>
        </tr>
          </thead>
          <tbody>
        {fyCompanyDataForTable &&
          fyCompanyDataForTable.map((item, i) => {
            return (
              <tr key={i}>
                 <td>{item.date}</td>         
                 <td>{item.revenueAccum ? parseInt(item.revenueAccum / 1000).toLocaleString() : "-"}</td>
                 <td>{item.NetIncomeLossAccum ? parseInt(item.NetIncomeLossAccum / 1000).toLocaleString() : "-"}</td>         
                 <td>{item.operatingCashFlowAccum ? parseInt(item.operatingCashFlowAccum / 1000).toLocaleString(): "-"}</td>                
                 <td>{item.assets ? parseInt(item.assets / 1000).toLocaleString(): "-"}</td>         
                 <td>{item.stockHoldersEquity ? parseInt(item.stockHoldersEquity / 1000).toLocaleString(): "-"}</td>                
              </tr>
            );
          })}
          </tbody>
      </table>




      <h3>通期業績データ 指標</h3>

      <table className={styles.table}>
         <thead>
        <tr>
          <th>年月</th>
          <th>株価</th>
          <th>BPS</th>
          <th>PBR</th>
          <th>EPS（累計）</th>
          <th>PER（累計）</th>
        </tr>
        </thead>
        <tbody>
        {fyCompanyDataForTable &&
          fyCompanyDataForTable.map((item, i) => {
            return (
              <tr key={i}>
                 <td>{item.date}</td>         
                 <td>{item.close} </td>
                 <td>{item.bps!="NaN" ? item.bps : "-"} </td>         
                 <td>{item.pbr!="NaN" ? item.pbr : "-"}</td>                
                 <td>{item.epsAccum!="NaN" ? item.epsAccum : "-"}</td>         
                 <td>{item.perAccum!="NaN" ? item.perAccum : "-"} </td>                
              </tr>
            );
          })}
          </tbody>
      </table>


      <h3>単四半期業績データ PL/CFS/BS</h3>

      <table  className={styles.table}>
               <thead>
        <tr>
          <th>年月</th>
          <th>売上高</th>
          <th>純利益</th>
          <th>営業CF</th>
          <th>総資産</th>
          <th>株主資本</th>
        </tr>
        </thead>
         <tbody>
        {QtrCompanyDataForTable &&
          QtrCompanyDataForTable.map((item, i) => {
            return (
              <tr key={i}>
                 <td>{item.date}</td>         
                 <td>{item.revenue ? parseInt(item.revenue / 1000).toLocaleString():"-" }</td>
                 <td>{item.NetIncomeLoss ? parseInt(item.NetIncomeLoss / 1000).toLocaleString() : "-"} </td>         
                 <td> {item.operatingCashFlow ? parseInt(item.operatingCashFlow / 1000).toLocaleString() : "-"}</td>                
                 <td>{item.assets ? parseInt(item.assets / 1000).toLocaleString() : "-"}</td>         
                 <td>{item.stockHoldersEquity ? parseInt(item.stockHoldersEquity / 1000).toLocaleString() : "-"}</td>                
              </tr>
            );
          })}
          </tbody>
      </table>

      <h3>単四半期業績データ 株式指標等</h3>

      <table className={styles.table}>
      <thead>
        <tr>
          <th>年月</th>
          <th>株価</th>
          <th>BPS</th>
          <th>PBR</th>
          <th>EPS</th>
          <th>流通株式数</th>
        </tr>
        </thead>
         <tbody>
        {QtrCompanyDataForTable &&
          QtrCompanyDataForTable.map((item, i) => {
            return (
              <tr key={i}>
                 <td>{item.date}</td>         
                 <td>{item.close}</td>
                 <td>{item.bps!="NaN" ? item.bps :"-"} </td>         
                 <td>{item.pbr!="NaN" ? item.pbr :"-"} </td>                
                 <td>{item.eps!="NaN" ? item.eps :"-"}</td>         
                 <td>{item.numberOfSharesOutstanding!="NaN" ? parseInt(item.numberOfSharesOutstanding/1000).toLocaleString() :"-"} </td>                
              </tr>
            );
          })}
          </tbody>
      </table>
      <p style={{ textAlign:'right' }}>データ空欄部分は科目変換定義等調整中</p>

      <h3>株式分割データ</h3>
      <ul>
        {priceData &&
          priceData.map((item, i) => {
            if (item.splitCategory) {
              return (
              <li key={i}>
                {item.date} /
                分割種別: {item.splitCategory} /
                分割比率:{item.splitRatio} /
              </li>
              )
            }
          })}
      </ul>
    </div>
  );
};

export default StockCandleChart;
