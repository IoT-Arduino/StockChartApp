// Chart Option ==============================================================
import { EChartsOption } from 'echarts-for-react'

export const chartOption = (
  newDateData: Array<string>,
  filteredDateForBarChart: Array<string>,
  newPriceData: Array<Array<number>>,
  markerChartData: Array<Object>,
  slicedResultTheoryStockPriceAsset: Array<number>,
  slicedResultTheoryStockPriceOperation: Array<number>,
  operatingCashFlowData: Array<number>,
  netIncomeArr: Array<number>,
  operatingCashFlowIndicator: Array<number>
): EChartsOption => {
  return {
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
        name: 'Price(USD)',
        scale: true,
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
        name: 'OpeCF(GR) : NetIncome（YL）',
        scale: true,
        splitNumber: 1,
        gridIndex: 1,
        axisLabel: {
          formatter: '{value} ',
          show: true,
        },
        axisLine: { show: true },
        axisTick: { show: true },
        splitLine: { show: true },
      },
      {
        name: 'OpeCFMgn',
        scale: true,
        splitNumber: 1,
        gridIndex: 1,
        axisLabel: {
          formatter: '{value} %',
          show: true,
        },
        axisLine: { show: true },
        axisTick: { show: true },
        splitLine: { show: true },
        min: 0,
        max: 50,
      },
    ],
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
}
