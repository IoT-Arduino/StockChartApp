import ReactEcharts from 'echarts-for-react'
import { calcEdgarData } from '../functions/CalcEdgarData'
import { useState, useEffect } from 'react'

// import { Tabs } from '@mantine/core'
import StockTabSection from './StockTabSection'

import PagingTicker from './PagingTicker'

import { chartOption } from '../functions/chartOption'

const StockCandleChart = ({
  priceData,
  edgarData,
  marker,
  id,
  companyInfo,
  prevTicker,
  nextTicker,
  signIn,
  t,
}) => {
  console.log(edgarData)

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ----------------------------------------------

  const edgarFsData = calcEdgarData(edgarData)

  const markerChartData = marker.map((item, i) => {
    const highPrice = priceData.find((value) => value.date === item.date)?.High * 1.1
    return {
      value: item.value,
      coord: [item.date, highPrice],
      name: item.name,
      date: item.date,
      itemStyle: {
        color: 'rgb(41,60,85)',
      },
    }
  })

  // console.log(markerChartData)

  //　EdgarDataの加工処理
  const newEdgarData = edgarFsData.map((item) => {
    // 掛け持ち表示対応、株式数　epsBasic と Diluted (Dilutedを基本になければ、Basicとして、チャート表示とテーブル表示に対応する)
    const epsBasicAndDiluted = item.epsDiluted ? item.epsDiluted : item.eps
    const epsBasicAndDilutedAccum = item.epsAccumDiluted ? item.epsAccumDiluted : item.epsAccum

    const numberOfSharesOutstanding = item.commonStockSharesOutstanding
      ? item.commonStockSharesOutstanding
      : item.weightedAverageNumberOfDilutedSharesOutstanding

    const bookPerShare = item.stockHoldersEquity / numberOfSharesOutstanding

    const comonStockDividendPerShareYear = item.commonStockDividendsPerShareDeclaredYear
      ? item.commonStockDividendsPerShareDeclaredYear
      : Math.round((item.commonStockDividendsCashPaidYear / numberOfSharesOutstanding) * 100) / 100

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
      // 営業CFマージン 単四半期の営業CF / 単四半期の売上
      operatingCashFlowMargin: item.operatingCashFlow / item.revenue,

      // Yahoo Finance と一致する。commonStockSharesOutstanding　を使用。
      bps: Math.round(bookPerShare * 100) / 100,
      // EPSはBasicを使用（データがそろっている、YahooFinanceと同じ、株探USはDiluted）
      eps: Math.round(epsBasicAndDiluted * 100) / 100,
      epsAccum: Math.round(epsBasicAndDilutedAccum * 100) / 100,
      stockHoldersEquityRatio: Math.round((item.stockHoldersEquity / item.assets) * 100) / 100,

      // 配当関係　ｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰ
      // 一株当たり配当　DPS
      commonStockDividendsPerShareDeclaredDeducted:
        item.commonStockDividendsPerShareDeclaredDeducted,
      commonStockDividendsPerShareDeclaredYear: comonStockDividendPerShareYear,

      // 配当性向　    四半期の場合、直近四半期の1株配当　 ÷ 直近4四半期の調整後希薄化EPS %表示
      dividendPayoutRatio:
        Math.round(
          ((item.commonStockDividendsPerShareDeclaredDeducted * 100) / epsBasicAndDiluted) * 100
        ) / 100,
      // 配当性向　年間
      dividendPayoutRatioYear:
        Math.round(((comonStockDividendPerShareYear * 100) / epsBasicAndDilutedAccum) * 100) / 100,
    }
  })

  // console.log(newEdgarData)

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
      calcRatio: price.calcRatio,
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

      operatingCashFlowMargin: newEdgarData.find((value) => value.date === price.date)
        ?.operatingCashFlowMargin,

      // 株式指標   price.calcRatio で調整する。ｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰ
      // 株式数　分割の場合、株数は過去の株数に掛け算する。。
      numberOfSharesOutstanding:
        newEdgarData.find((value) => value.date === price.date)?.numberOfSharesOutstanding *
        Number(price.calcRatio),

      // 一株あたり経営指標　分割の場合、EPS等は過去を割る
      bps: parseFloat(
        newEdgarData.find((value) => value.date === price.date)?.bps / Number(price.calcRatio)
      ).toFixed(2),
      eps: parseFloat(
        newEdgarData.find((value) => value.date === price.date)?.eps / Number(price.calcRatio)
      ).toFixed(2),
      epsAccum: parseFloat(
        newEdgarData.find((value) => value.date === price.date)?.epsAccum / Number(price.calcRatio)
      ).toFixed(2),

      // 株価指標　株式分割調整。（要確認）
      pbr: parseFloat(
        (price.Close / newEdgarData.find((value) => value.date === price.date)?.bps) *
          Number(price.calcRatio)
      ).toFixed(2),

      per: parseFloat(
        (price.Close / newEdgarData.find((value) => value.date === price.date)?.eps) *
          Number(price.calcRatio) *
          0.25 // 四半期の為　分母に0.25を掛ける。年間換算のEPS。
      ),
      // マイナス表示を加工する為、数値型を維持
      perAccum: parseFloat(
        (price.Close / newEdgarData.find((value) => value.date === price.date)?.epsAccum) *
          Number(price.calcRatio)
      ),

      // 配当関係　ｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰ
      // 一株当たり配当　DPS 四半期　－　分割考慮済み
      commonStockDividendsPerShareDeclaredDeducted: parseFloat(
        newEdgarData.find((value) => value.date === price.date)
          ?.commonStockDividendsPerShareDeclaredDeducted / Number(price.calcRatio)
      ).toFixed(2), // 一株当たり配当　DPS 年間　－　分割考慮済み
      commonStockDividendsPerShareDeclaredYear: parseFloat(
        newEdgarData.find((value) => value.date === price.date)
          ?.commonStockDividendsPerShareDeclaredYear / Number(price.calcRatio)
      ).toFixed(2),

      // 配当利回り・四半期(FYのみ表示対象とする) % 表示　－　分割考慮済み
      dividendYieldDeducted:
        parseFloat(
          (newEdgarData.find((value) => value.date === price.date)
            ?.commonStockDividendsPerShareDeclaredDeducted *
            100) /
            (price.Close * Number(price.calcRatio))
        ).toFixed(2) + '%',
      // 配当利回り・年間(FYのみ表示対象とする) % 表示  －　分割考慮済み
      dividendYieldYear:
        parseFloat(
          (newEdgarData.find((value) => value.date === price.date)
            ?.commonStockDividendsPerShareDeclaredYear *
            100) /
            (price.Close * Number(price.calcRatio))
        ).toFixed(2) + '%',

      // 配当性向　% 表示
      dividendPayoutRatio:
        newEdgarData.find((value) => value.date === price.date)?.dividendPayoutRatio + '%',

      dividendPayoutRatioYear:
        newEdgarData.find((value) => value.date === price.date)?.dividendPayoutRatioYear + '%',
    }
  })

  // console.log(companyData)

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
      const opeCashIndx = parseFloat(item.operatingCashFlow / item.revenue) * 100
      return opeCashIndx >= 0 ? opeCashIndx : 0
    }
  })

  const operatingCashFlowData = filteredDataForBarChart.map((item) => {
    const opeCashData = item.operatingCashFlow / 1000000
    return opeCashData
  })

  const netIncomeArr = filteredDataForBarChart.map((item) => {
    const netIncomeData = item.NetIncomeLoss / 1000000
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
  const option = chartOption(
    newDateData,
    filteredDateForBarChart,
    newPriceData,
    markerChartData,
    slicedResultTheoryStockPriceAsset,
    slicedResultTheoryStockPriceOperation,
    operatingCashFlowData,
    netIncomeArr,
    operatingCashFlowIndicator
  )

  return (
    <div>
      <ReactEcharts option={option} style={{ height: '600px', width: '100%' }} />
      <PagingTicker prevTicker={prevTicker} nextTicker={nextTicker} signIn={signIn} t={t} />
      <p style={{ textAlign: 'right' }}>(Million)</p>
      <div data-testid="tabSection">
      <StockTabSection
        companyInfo={companyInfo}
        fyCompanyDataForTable={fyCompanyDataForTable}
        isDividend={isDividend}
        isSplit={isSplit}
        QtrCompanyDataForTable={QtrCompanyDataForTable}
        priceData={priceData}
        ticker={id}
        t={t}
        
      />
      </div>
    </div>
  )
}

export default StockCandleChart
