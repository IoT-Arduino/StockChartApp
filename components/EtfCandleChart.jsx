import ReactEcharts from "echarts-for-react";

const EtfCandleChart = ({ etfData }) => {

    const timestamp = etfData.timestamp

    const dateArr = timestamp.map((time)=> {
        var date = new Date(time*1000)
        return date.getFullYear()+ "/" +(date.getMonth()+1)
    })

    const adjclose = etfData.indicators.adjclose[0].adjclose

  // 開始点からの変化率で比較する処理です。
  const changeRatio = adjclose.map((close,i) => {
    let num = null
    if (i == 0) {
      num = 100
    } else {
      num = parseFloat(close*100/adjclose[0])
    }
    return num
  })
 
　// Chart Option
  const option = {
    xAxis: [
      {
        data: dateArr,
        gridIndex: 0,
      }
    ],
    grid: [
      {
        left: "25%",
        right: "10%",
        top: 50,
        height: '70%',
      }
    ],
    yAxis: [
      {
        name: "Value",
        scale: true,
        // interval: 100,
        axisLabel: {
          formatter: "{value}",
        },
        // splitArea: {
        //   show: true,
        // },
        axisPointer: {
          show: true,
        },
      }

    ],
    lineStyle: {
      color: '#7fbe9e',
      width: 1,
    },
    areaStyle: {
      color: '#7fbe9e',
      opacity: 0.2,
    },
    showSymbol: false,
    series: [
     {
      name: '資産価格',
      type: 'line',
      xAxisIndex: 0,
      yAxisIndex: 0,
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
        data: changeRatio,
        smooth: false,
      },
    ],
  };  
    
  return (
    <div className="w-4/5">
      <ReactEcharts option={option} />
    </div>
  )
}

export default EtfCandleChart


