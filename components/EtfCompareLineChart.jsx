import ReactEcharts from "echarts-for-react";

const EtfCompareLineChart = ({ fundsData }) => {

  const timestamp = fundsData.vooData.timestamp
  
  const dateArr = timestamp.map((time)=> {
    var date = new Date(time*1000)
    return date.getFullYear()+ "/" +(date.getMonth()+1)
  })
  
  const adjcloseVoo = fundsData.vooData.indicators.adjclose[0].adjclose
  const adjcloseVti = fundsData.vtiData.indicators.adjclose[0].adjclose
  const adjcloseVt = fundsData.vtData.indicators.adjclose[0].adjclose

  // 開始点からの変化率で比較する処理。
  const changeRatioVoo = adjcloseVoo.map((close,i) => {
    let num = null
    if (i == 0) {
      num = 100
    } else {
      num = parseFloat(close*100/adjcloseVoo[0])
    }
    return num
  })

    const changeRatioVti = adjcloseVti.map((close,i) => {
    let num = null
    if (i == 0) {
      num = 100
    } else {
      num = parseFloat(close*100/adjcloseVti[0])
    }
    return num
  })

  const changeRatioVt = adjcloseVt.map((close,i) => {
    let num = null
    if (i == 0) {
      num = 100
    } else {
      num = parseFloat(close*100/adjcloseVt[0])
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
    series: [
     {
      name: '資産価格',
      type: 'line',
      xAxisIndex: 0,
      yAxisIndex: 0,
      itemStyle: {
          color: "#FF0000",
      },
      emphasis: {
        focus: 'series'
      },
        data: changeRatioVoo,
        smooth: false,
      },
      {
      name: '資産価格',
      type: 'line',
      xAxisIndex: 0,
      yAxisIndex: 0,
      itemStyle: {
        color: "#008000",
      },
      emphasis: {
        focus: 'series'
      },
      data: changeRatioVti,
      smooth: false,
      },
      {
      name: '資産価格',
      type: 'line',
      xAxisIndex: 0,
      yAxisIndex: 0,
      itemStyle: {
        color: "#4B68B8",
      },
      emphasis: {
        focus: 'series'
      },
      data: changeRatioVt,
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

export default EtfCompareLineChart


