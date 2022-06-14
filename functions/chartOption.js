// Chart Option ==============================================================
export const chartOption = (newDateData,filteredDateForBarChart,newPriceData,markerChartData,slicedResultTheoryStockPriceAsset,slicedResultTheoryStockPriceOperation,operatingCashFlowData,netIncomeArr,operatingCashFlowIndicator) => {
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
        // min: 0,
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
        max: 50,
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
}
