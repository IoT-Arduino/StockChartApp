import ReactEcharts from 'echarts-for-react'
import { calcEdgarData } from '../functions/CalcEdgarData'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'

const StockCandleChart = ({ priceData, edgarData, marker, id, companyInfo }) => {
  // console.log(edgarData)

  // 画面表示State 管理==============================================================
  const [isDividend, setIsDividend] = useState(false)
  const [isSplit, setIsSplit] = useState(false)

  const someDividendResult = edgarData.some((item) => {
    const isSomeDividend = Object.keys(item).some((v) => {
      return (
        v == 'CommonStockDividendsPerShareDeclared_1_Q1_USD' ||
        v == 'CommonStockDividendsPerShareDeclared_1_Q2_USD' ||
        v == 'CommonStockDividendsPerShareDeclared_1_Q3_USD' ||
        v == 'CommonStockDividendsPerShareDeclared_4_FY_USD' ||
        v == 'CommonStockDividendsPerShareCashPaid_1_Q1_USD' ||
        v == 'CommonStockDividendsPerShareCashPaid_1_Q2_USD' ||
        v == 'CommonStockDividendsPerShareCashPaid_1_Q3_USD' ||
        v == 'CommonStockDividendsPerShareCashPaid_4_FY_USD'
      )
    })
    return isSomeDividend
  })

  const someSplitResult = priceData.some((item) => {
    const isSomeSplit = Object.keys(item).some((v) => {
      return v == 'splitCategory'
    })
    return isSomeSplit
  })

  useEffect(() => {
    setIsDividend(someDividendResult)
    setIsSplit(someSplitResult)
  }, [])

  // ----------------------------------------------

  const edgarFsData = calcEdgarData(edgarData)

  const markerChartData = marker.map((item, i) => {
    const closePrice = priceData.find((value) => value.date === item.date)?.Close * 1.2
    return {
      value: item.value,
      coord: [item.date, closePrice],
      name: item.name,
      date: item.date,
      itemStyle: {
        color: 'rgb(41,60,85)',
      },
    }
  })

  //　EdgarDataの加工処理
  const newEdgarData = edgarFsData.map((item) => {
    // 掛け持ち表示対応、株式数　epsBasic と Diluted (Dilutedを基本になければ、Basicとして、チャート表示とテーブル表示に対応する)
    const epsBasicAndDiluted = item.epsDiluted ? item.epsDiluted : item.eps
    const epsBasicAndDilutedAccum = item.epsAccumDiluted ? item.epsAccumDiluted : item.epsAccum
    // const numberOfSharesOutstanding = item.weightedAverageNumberOfDilutedSharesOutstanding
    //   ? item.weightedAverageNumberOfDilutedSharesOutstanding
    //   : item.commonStockSharesOutstanding

    const numberOfSharesOutstanding = item.commonStockSharesOutstanding
    ? item.commonStockSharesOutstanding
    : item.weightedAverageNumberOfDilutedSharesOutstanding

    const bookPerShare = item.stockHoldersEquity / numberOfSharesOutstanding

    return {
      date: item.date,
      fp: item.fp,
      // PL
      revenue: item.revenue,
      revenueAccum: item.revenueAccum,
      NetIncomeLoss: item.NetIncomeLoss,
      NetIncomeLossAccum: item.NetIncomeLossAccum,
      // CFS
      operatingCashFlow: item.operatingCashFlow,
      operatingCashFlowAccum: item.operatingCashFlowAccum,
      // BS
      assets: item.assets,
      stockHoldersEquity: item.stockHoldersEquity,
      // 株式指標・経営指標
      numberOfSharesOutstanding: numberOfSharesOutstanding,
 
      // Yahoo Finance と一致する。commonStockSharesOutstanding　を使用。
      bps: parseFloat(bookPerShare).toFixed(2),
      // EPSはBasicを使用（データがそろっている、YahooFinanceと同じ、株探USはDiluted）
      eps: parseFloat(epsBasicAndDiluted).toFixed(2),
      epsAccum: parseFloat(epsBasicAndDilutedAccum).toFixed(2),
      // epsDiluted: parseFloat(item.epsDiluted).toFixed(2),
      // epsAccumDiluted: parseFloat(item.epsAccumDiluted).toFixed(2),
      stockHoldersEquityRatio: parseFloat(item.stockHoldersEquity / item.assets).toFixed(2),
      // 配当関係　ｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰ
      // 一株当たり配当　DPS
      commonStockDividendsPerShareDeclaredDeducted:
        item.commonStockDividendsPerShareDeclaredDeducted,
      commonStockDividendsPerShareDeclaredYear: item.commonStockDividendsPerShareDeclaredYear,
      // 配当性向　    四半期の場合、直近四半期の1株配当　 ÷ 直近4四半期の調整後希薄化EPS
      dividendPayoutRatio: parseFloat(
        (item.commonStockDividendsPerShareDeclaredDeducted * 100) / item.eps
      ).toFixed(1),
      dividendPayoutRatioYear: parseFloat(
        (item.commonStockDividendsPerShareDeclaredYear * 100) / item.epsAccum
      ).toFixed(1),
    }
  })

  // 　日付をキーとして、edinet、markerData,splitDataと株価データをまとめて一つのオブジェクトにして、連想配列にする
  const companyData = priceData.map((price) => {
    return {
      date: price.date,
      fp: newEdgarData.find((value) => value.date === price.date)?.fp,
      // Price Data ---------------
      open: parseFloat(price.Open).toFixed(2),
      close: parseFloat(price.Close).toFixed(2),
      low: parseFloat(price.Low).toFixed(2),
      high: parseFloat(price.High).toFixed(2),
      // EdgarData ----------------
      // PL
      revenue: newEdgarData.find((value) => value.date === price.date)?.revenue,
      revenueAccum: newEdgarData.find((value) => value.date === price.date)?.revenueAccum,
      NetIncomeLoss: newEdgarData.find((value) => value.date === price.date)?.NetIncomeLoss,
      NetIncomeLossAccum: newEdgarData.find((value) => value.date === price.date)
        ?.NetIncomeLossAccum,
      // CFS
      operatingCashFlow: newEdgarData.find((value) => value.date === price.date)?.operatingCashFlow,
      operatingCashFlowAccum: newEdgarData.find((value) => value.date === price.date)
        ?.operatingCashFlowAccum,
      // BS
      stockHoldersEquity: newEdgarData.find((value) => value.date === price.date)
        ?.stockHoldersEquity,
      assets: newEdgarData.find((value) => value.date === price.date)?.assets,

      // 経営指標
      stockHoldersEquityRatio: newEdgarData.find((value) => value.date === price.date)
        ?.stockHoldersEquityRatio,

      // 株式指標   price.calcRatio で調整する。ｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰ
      // 株式数　分割の場合、株数は過去の株数に掛け算する。。
      numberOfSharesOutstanding:
        newEdgarData.find((value) => value.date === price.date)?.numberOfSharesOutstanding *
        price.calcRatio,

      // commonStockSharesOutstanding: newEdgarData.find(
      //   (value) => value.date === price.date
      // )?.commonStockSharesOutstanding * price.calcRatio,

      // weightedAverageNumberOfDilutedSharesOutstanding: newEdgarData.find(
      //   (value) => value.date === price.date
      // )?.weightedAverageNumberOfDilutedSharesOutstanding * price.calcRatio,

      // 一株あたり経営指標　分割の場合、EPS等は過去を割る
      bps: parseFloat(
        newEdgarData.find((value) => value.date === price.date)?.bps / price.calcRatio
      ).toFixed(2),
      eps: parseFloat(
        newEdgarData.find((value) => value.date === price.date)?.eps / price.calcRatio
      ).toFixed(2),
      epsAccum: parseFloat(
        newEdgarData.find((value) => value.date === price.date)?.epsAccum / price.calcRatio
      ).toFixed(2),
      // epsDiluted: newEdgarData.find((value) => value.date === price.date)?.epsDiluted/price.calcRatio,
      // epsAccumDiluted: newEdgarData.find((value) => value.date === price.date)?.epsAccumDiluted/price.calcRatio,

      // 株価指標　株式分割調整。（要確認）
      pbr: parseFloat(
        (price.Close / newEdgarData.find((value) => value.date === price.date)?.bps) *
          price.calcRatio
      ).toFixed(2),
      per: parseFloat(
        (price.Close / newEdgarData.find((value) => value.date === price.date)?.eps) *
          price.calcRatio
      ).toFixed(2),
      perAccum: parseFloat(
        (price.Close / newEdgarData.find((value) => value.date === price.date)?.epsAccum) *
          price.calcRatio
      ).toFixed(2),

      // 配当関係　ｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰ
      // 一株当たり配当　DPS
      commonStockDividendsPerShareDeclaredDeducted: parseFloat(
        newEdgarData.find((value) => value.date === price.date)
          ?.commonStockDividendsPerShareDeclaredDeducted
      ).toFixed(2),

      commonStockDividendsPerShareDeclaredYear: parseFloat(
        newEdgarData.find((value) => value.date === price.date)
          ?.commonStockDividendsPerShareDeclaredYear
      ).toFixed(2),

      // 配当利回り(FYのみ表示対象とする) % 表示
      dividendYieldDeducted:
        parseFloat(
          (newEdgarData.find((value) => value.date === price.date)
            ?.commonStockDividendsPerShareDeclaredDeducted *
            100) /
            price.Close
        ).toFixed(2) + '%',
      dividendYieldYear:
        parseFloat(
          (newEdgarData.find((value) => value.date === price.date)
            ?.commonStockDividendsPerShareDeclaredYear *
            100) /
            price.Close
        ).toFixed(2) + '%',

      // 配当性向　% 表示
      dividendPayoutRatio:
        newEdgarData.find((value) => value.date === price.date)?.dividendPayoutRatio + '%',

      dividendPayoutRatioYear:
        newEdgarData.find((value) => value.date === price.date)?.dividendPayoutRatioYear + '%',
    }
  })

  //  console.log(companyData)

  // console.log(edgarData)

  // 　チャート表示用配列データ作成　＝＝＝＝＝＝＝＝＝＝＝＝＝

  //   チャートの左端きれいにする為のslice処理。
  // まず、companyDataに最初の値が存在するIndexを取得　fpがundefinedのもの（理論事業価値の計算揃えの為＋3する）
  const firstEdgarIndex = companyData.findIndex((item) => item.fp != undefined) + 3
  // そのIndexをつかって以下の配列をSlice
  const slicedCompanyData = companyData.slice(firstEdgarIndex)

  const newDateData = slicedCompanyData.map((item, i) => {
    return item.date
  })

  const newPriceData = slicedCompanyData.map((item) => {
    return [item.open, item.close, item.low, item.high]
  })

  // 　理論株価　資産価値計算用　/ map用の配列はcompanyDataを使うこと(slicedを使わない)
  const theoryStockPriceAsset = companyData.map((item, i) => {
    const assetValueWithRatio = item.bps
    return assetValueWithRatio
  })

  const newTheoryStockPriceAsset = theoryStockPriceAsset
  const resultTheoryStockPriceAsset = []
  for (let i = 0; i < newTheoryStockPriceAsset.length; i++) {
    if (isNaN(newTheoryStockPriceAsset[i])) {
      newTheoryStockPriceAsset[i] = newTheoryStockPriceAsset[i - 1]
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
    const operationValue = parseFloat(item.eps) * 15 * 4
    // 理論株価
    return operationValue
  })

  const newTheoryStockPriceOperation = theoryStockPriceOperation
  const resultTheoryStockPriceOperation = []
  for (let i = 0; i < newTheoryStockPriceOperation.length; i++) {
    if (isNaN(newTheoryStockPriceOperation[i])) {
      newTheoryStockPriceOperation[i] = newTheoryStockPriceOperation[i - 1]
    } else {
      newTheoryStockPriceOperation[i] = newTheoryStockPriceOperation[i]
    }
    // 理論株価　マイナスの値は０にする。
    if (newTheoryStockPriceOperation[i] < 0) {
      newTheoryStockPriceOperation[i] = 0
    }
    resultTheoryStockPriceOperation.push(newTheoryStockPriceOperation[i])
  }

  const slicedResultTheoryStockPriceOperation =
    resultTheoryStockPriceOperation.slice(firstEdgarIndex)

  //　キャッシュフロー棒グラフエリア用 ---------------------------------------
  //  一旦四半期データのみにフィルタする処理

  const filteredDataForBarChart = slicedCompanyData.filter((item, i) => {
    return item.operatingCashFlow != null
  })

  const filteredDateForBarChart = filteredDataForBarChart.map((item) => {
    const dateData = item.date
    return dateData
  })

  const operatingCashFlowIndicator = filteredDataForBarChart.map((item) => {
    if (companyInfo.Sector === 'Finance') {
      return null
    } else {
      const opeCashIndx = (parseFloat(item.operatingCashFlow / item.revenue) * 100).toFixed(2)
      return opeCashIndx
    }
  })

  const operatingCashFlowData = filteredDataForBarChart.map((item) => {
    const opeCashData = parseInt(item.operatingCashFlow) / 10000000
    return opeCashData
  })

  const netIncomeArr = filteredDataForBarChart.map((item) => {
    const netIncomeData = parseInt(item.NetIncomeLoss) / 10000000
    return netIncomeData
  })

  // テーブル表示用　データ処理　------------------------------

  const companyDataForTable = slicedCompanyData.slice().sort(function (a, b) {
    return a.date < b.date ? -1 : 1
  })

  //  通期業績データ
  const fyCompanyDataForTable = companyDataForTable.filter((item) => {
    return item.fp == 'FY'
  }) // 単四半期業績データ

  const QtrCompanyDataForTable = companyDataForTable.filter((item) => {
    const QTR = ['Q1', 'Q2', 'Q3', 'FY']
    return QTR.includes(item.fp)
  })

  // Chart Option ==============================================================
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
        left: '15%',
        right: '10%',
        top: 50,
        height: '50%',
      },
      {
        left: '15%',
        right: '10%',
        height: '20%',
        top: '72%',
      },
    ],
    yAxis: [
      {
        name: '株価(USD)',
        scale: true,
        // interval: 100,
        axisLabel: {
          formatter: '{value} ',
        },
        splitArea: {
          show: true,
        },
        axisPointer: {
          show: true,
        },
      },
      {
        name: '営業CF(緑) : 純利益（黄）',
        scale: true,
        splitNumber: 1,
        gridIndex: 1,
        axisLabel: { show: true },
        axisLabel: {
          formatter: '{value} ',
        },
        axisLine: { show: true },
        axisTick: { show: true },
        splitLine: { show: true },
        min: 0,
      },
      {
        name: '営業CFマージン',
        scale: true,
        splitNumber: 1,
        gridIndex: 1,
        axisLabel: { show: true },
        axisLabel: {
          formatter: '{value} %',
        },
        axisLine: { show: true },
        axisTick: { show: true },
        splitLine: { show: true },
        min: 0,
        max: 100,
      },
    ],
    // graphic: [
    //   {
    //     type: 'group',
    //     rotation: Math.PI / 4,
    //     bounding: 'raw',
    //     left: 110,
    //     top: 110,
    //     z: 100,
    //     children: [
    //       {
    //         type: 'rect',
    //         left: 'center',
    //         top: 'center',
    //         z: 100,
    //         shape: {
    //           width: 400,
    //           height: 50,
    //         },
    //         style: {
    //           fill: 'rgba(0,0,0,0.3)',
    //         },
    //       },
    //       {
    //         type: 'text',
    //         left: 'center',
    //         top: 'center',
    //         z: 100,
    //         style: {
    //           fill: '#fff',
    //           text: 'ECHARTS LINE CHART',
    //           font: 'bold 26px sans-serif',
    //         },
    //       },
    //     ],
    //   },
    // ],
    series: [
      {
        type: 'candlestick',
        data: newPriceData,
        grid: 0,
        xAxisIndex: 0,
        yAxisIndex: 0,
        markPoint: {
          label: {},
          data: markerChartData,
        },
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
          width: 1,
        },
        areaStyle: {
          opacity: 0.2,
        },
        emphasis: {
          focus: 'series',
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
          width: 1,
        },
        areaStyle: {
          opacity: 0.2,
        },
        emphasis: {
          focus: 'series',
        },
        data: slicedResultTheoryStockPriceOperation,
        smooth: true,
      },
      {
        name: 'Cashflow',
        type: 'bar',
        barGap: 0,
        grid: 1,
        xAxisIndex: 1,
        yAxisIndex: 1,
        itemStyle: {
          color: '#7fbe9e',
        },
        emphasis: {
          itemStyle: {
            color: '#140',
          },
        },
        data: operatingCashFlowData,
      },
      {
        name: 'NetIncome',
        type: 'bar',
        grid: 1,
        xAxisIndex: 1,
        yAxisIndex: 1,
        itemStyle: {
          color: '#ffec50',
        },
        emphasis: {
          itemStyle: {
            color: '#140',
          },
        },
        data: netIncomeArr,
      },
      {
        name: 'CFMargin',
        type: 'line',
        grid: 1,
        xAxisIndex: 1,
        yAxisIndex: 2,
        lineStyle: {
          color: '#5470C6',
          width: 1,
          type: 'dashed',
        },
        itemStyle: {
          color: '#5470C6',
        },
        data: operatingCashFlowIndicator,
      },
    ],
  }

  return (
    <>
      <ReactEcharts option={option} style={{ height: '600px', width: '100%' }} />
      <p style={{ textAlign: 'right' }}>単位は(Million)</p>

      <div className='relative overflow-x-auto shadow-md sm:rounded-lg my-4'>
        <h3 className="my-2 p-2">通期業績データ FS</h3>
        <table className='w-full text-sm text-gray-500 dark:text-gray-400 text-right'>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-2">年月</th>
              {companyInfo.Sector === 'Finance' ? null : <th scope="col" className="px-4 py-2">売上高</th>}
              <th scope="col" className="px-4 py-2">純利益</th>
              <th scope="col" className="px-4 py-2">営業CF</th>
              <th scope="col" className="px-4 py-2">総資産</th>
              <th scope="col" className="px-4 py-2">株主資本</th>
            </tr>
          </thead>
          <tbody>
            {fyCompanyDataForTable &&
              fyCompanyDataForTable.map((item, i) => {
                if (companyInfo.Sector === 'Finance') {
                  return (
                    <tr clasName="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700" key={i}>
                      <td className="px-4 py-2">{item.date}</td>
                      <td className="px-4 py-2">
                        {item.NetIncomeLossAccum
                          ? parseInt(item.NetIncomeLossAccum / 1000).toLocaleString()
                          : '-'}
                      </td>
                      <td className="px-4 py-2">
                        {item.operatingCashFlowAccum
                          ? parseInt(item.operatingCashFlowAccum / 1000).toLocaleString()
                          : '-'}
                      </td>
                      <td className="px-4 py-2">{item.assets ? parseInt(item.assets / 1000).toLocaleString() : '-'}</td>
                      <td className="px-4 py-2">
                        {item.stockHoldersEquity
                          ? parseInt(item.stockHoldersEquity / 1000).toLocaleString()
                          : '-'}
                      </td>
                    </tr>
                  )
                } else {
                  return (
                    <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700" key={i}>
                      <td className="px-4 py-2">{item.date}</td>
                      <td className="px-4 py-2">
                        {item.revenueAccum
                          ? parseInt(item.revenueAccum / 1000000).toLocaleString()
                          : '-'}
                      </td>
                      <td className="px-4 py-2">
                        {item.NetIncomeLossAccum
                          ? parseInt(item.NetIncomeLossAccum / 1000000).toLocaleString()
                          : '-'}
                      </td>
                      <td className="px-4 py-2">
                        {item.operatingCashFlowAccum
                          ? parseInt(item.operatingCashFlowAccum /1000000).toLocaleString()
                          : '-'}
                      </td>
                      <td className="px-4 py-2">{item.assets ? parseInt(item.assets /1000000).toLocaleString() : '-'}</td>
                      <td className="px-4 py-2">
                        {item.stockHoldersEquity
                          ? parseInt(item.stockHoldersEquity /1000000).toLocaleString()
                          : '-'}
                      </td>
                    </tr>
                  )
                }
              })}
          </tbody>
        </table>
      </div>


      <div className='relative overflow-x-auto shadow-md sm:rounded-lg my-4'>
        <h3 className="my-2 p-2">通期業績データ 指標</h3>
        <table className='w-full text-sm text-gray-500 dark:text-gray-400 text-right'>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-2">年月</th>
              <th scope="col" className="px-4 py-2">株価</th>
              <th scope="col" className="px-4 py-2">BPS</th>
              <th scope="col" className="px-4 py-2">PBR</th>
              <th scope="col" className="px-4 py-2">EPS（累計）</th>
              <th scope="col" className="px-4 py-2">PER（累計）</th>
            </tr>
          </thead>
          <tbody>
            {fyCompanyDataForTable &&
              fyCompanyDataForTable.map((item, i) => {
                return (
                  <tr key={i} className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                    <td className="px-4 py-2">{item.date}</td>
                    <td className="px-4 py-2">{item.close} </td>
                    <td className="px-4 py-2">{item.bps != 'NaN' ? item.bps : '-'} </td>
                    <td className="px-4 py-2">{item.pbr != 'NaN' ? item.pbr : '-'}</td>
                    <td className="px-4 py-2">{item.epsAccum != 'NaN' ? item.epsAccum : '-'}</td>
                    <td className="px-4 py-2">{item.perAccum != 'NaN' ? item.perAccum : '-'} </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>

      <div className='relative overflow-x-auto shadow-md sm:rounded-lg my-4'>
        <h3 className="my-2 p-2">単四半期業績データ PL/CFS/BS</h3>
        <table className='w-full text-sm text-gray-500 dark:text-gray-400 text-right'>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-2">年月</th>
              {companyInfo.Sector === 'Finance' ? null : <th>売上高</th>}
              <th scope="col" className="px-4 py-2">純利益</th>
              <th scope="col" className="px-4 py-2">営業CF</th>
              <th scope="col" className="px-4 py-2">総資産</th>
              <th scope="col" className="px-4 py-2">株主資本</th>
            </tr>
          </thead>
          <tbody>
            {QtrCompanyDataForTable &&
              QtrCompanyDataForTable.map((item, i) => {
                if (companyInfo.Sector === 'Finance') {
                  return (
                    <tr key={i} clasName="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                      <td className="px-4 py-2">{item.date}</td>
                      <td className="px-4 py-2">
                        {item.NetIncomeLoss
                          ? parseInt(item.NetIncomeLoss /1000000).toLocaleString()
                          : '-'}{' '}
                      </td>
                      <td className="px-4 py-2">
                        {' '}
                        {item.operatingCashFlow
                          ? parseInt(item.operatingCashFlow /1000000).toLocaleString()
                          : '-'}
                      </td>
                      <td className="px-4 py-2">{item.assets ? parseInt(item.assets /1000000).toLocaleString() : '-'}</td>
                      <td className="px-4 py-2">
                        {item.stockHoldersEquity
                          ? parseInt(item.stockHoldersEquity /1000000).toLocaleString()
                          : '-'}
                      </td>
                    </tr>
                  )
                } else {
                  return (
                    <tr key={i} className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                      <td className="px-4 py-2">{item.date}</td>
                      <td className="px-4 py-2">{item.revenue ? parseInt(item.revenue /1000000).toLocaleString() : '-'}</td>
                      <td className="px-4 py-2">
                        {item.NetIncomeLoss
                          ? parseInt(item.NetIncomeLoss /1000000).toLocaleString()
                          : '-'}{' '}
                      </td>
                      <td className="px-4 py-2">
                        {' '}
                        {item.operatingCashFlow
                          ? parseInt(item.operatingCashFlow /1000000).toLocaleString()
                          : '-'}
                      </td>
                      <td className="px-4 py-2">{item.assets ? parseInt(item.assets /1000000).toLocaleString() : '-'}</td>
                      <td className="px-4 py-2">
                        {item.stockHoldersEquity
                          ? parseInt(item.stockHoldersEquity /1000000).toLocaleString()
                          : '-'}
                      </td>
                    </tr>
                  )
                }
              })}
          </tbody>
        </table>
      </div>

      <div className='relative overflow-x-auto shadow-md sm:rounded-lg my-4'>
        <h3 className="my-2 p-2">単四半期業績データ 株式指標等</h3>

        <table className='w-full text-sm text-gray-500 dark:text-gray-400 text-right'>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-2">年月</th>
              <th scope="col" className="px-4 py-2">株価</th>
              <th scope="col" className="px-4 py-2">BPS</th>
              <th scope="col" className="px-4 py-2">PBR</th>
              <th scope="col" className="px-4 py-2">EPS</th>
              <th scope="col" className="px-4 py-2">流通株式数</th>
            </tr>
          </thead>
          <tbody>
            {QtrCompanyDataForTable &&
              QtrCompanyDataForTable.map((item, i) => {
                return (
                  <tr key={i} className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                    <td className="px-4 py-2">{item.date}</td>
                    <td className="px-4 py-2">{item.close}</td>
                    <td className="px-4 py-2">{item.bps != 'NaN' ? item.bps : '-'} </td>
                    <td className="px-4 py-2">{item.pbr != 'NaN' ? item.pbr : '-'} </td>
                    <td className="px-4 py-2">{item.eps != 'NaN' ? item.eps : '-'}</td>
                    <td className="px-4 py-2">
                      {item.numberOfSharesOutstanding != 'NaN'
                        ? parseInt(item.numberOfSharesOutstanding /1000000).toLocaleString()
                        : '-'}{' '}
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>

      {isDividend && (
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg my-4'>
          <h3 className="my-2 p-2">年間配当データ 指標</h3>
          <table className='w-full text-sm text-gray-500 dark:text-gray-400 text-right'>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-2">年月</th>
                <th scope="col" className="px-4 py-2">一株当たり配当年</th>
                <th scope="col" className="px-4 py-2">配当利回り年</th>
                <th scope="col" className="px-4 py-2">配当性向年</th>
              </tr>
            </thead>
            <tbody>
              {fyCompanyDataForTable &&
                fyCompanyDataForTable.map((item, i) => {
                  return (
                    <tr key={i} className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                      <td className="px-4 py-2">{item.date}</td>
                      <td className="px-4 py-2">
                        {item.commonStockDividendsPerShareDeclaredYear != 'NaN'
                          ? item.commonStockDividendsPerShareDeclaredYear
                          : '-'}{' '}
                      </td>
                      <td className="px-4 py-2">{item.dividendYieldYear != 'NaN%' ? item.dividendYieldYear : '-'}</td>
                      <td className="px-4 py-2">
                        {item.dividendPayoutRatioYear != 'NaN%'
                          ? item.dividendPayoutRatioYear
                          : '-'}{' '}
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      )}

      <div className="my-4">
        <h4 className="font-bold text-sm">単位について</h4>
        <ul className="mx-8 text-xs">
          <li className="list-disc">業績データ：売上高、純利益、営業CF、総資産、株主資本は「百万USD」。</li>
          <li className="list-disc">株価、BPS、EPS、一株当たり配当は「USD」</li>
          <li className="list-disc">流通株式数は、百万株単位。</li>
          <li className="list-disc">PBR,PERは整数倍</li>
        </ul>
      </div>

      {isSplit && (
        <div>
          <h3 className='text-lg font-bold'>株式分割データ</h3>
          <ul className='my-3'>
            {priceData &&
              priceData.map((item, i) => {
                if (item.splitCategory) {
                  return (
                    <li key={i}>
                      {item.date} / 分割種別: {item.splitCategory} / 分割比率:{item.splitRatio} /
                    </li>
                  )
                }
              })}
          </ul>
        </div>
      )}
    </>
  )
}

export default StockCandleChart
