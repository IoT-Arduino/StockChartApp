import React, { useEffect, useRef } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";

const ChartComponent = (props) => {
  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();

  useEffect(() => {
    const { priceData } = props;

    // データは昇順にする。！！！！
    const reversed = priceData.reverse();

    const newPriceData = reversed.map((item) => {
      return {
        time: item.date.toString(),
        open: parseFloat(item.open.replace(/,/g, "")),
        high: parseFloat(item.high.replace(/,/g, "")),
        low: parseFloat(item.low.replace(/,/g, "")),
        close: parseFloat(item.close.replace(/,/g, "")),
      };
    });

    console.log(newPriceData);

    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
      layout: {
        backgroundColor: "#253248",
        textColor: "rgba(255, 255, 255, 0.9)",
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      priceScale: {
        borderColor: "#485c7b",
      },
      timeScale: {
        borderColor: "#485c7b",
      },
      pane: 0,
    });

    const candleSeries = chart.current.addCandlestickSeries({
      upColor: "#4bffb5",
      downColor: "#ff4976",
      borderDownColor: "#ff4976",
      borderUpColor: "#4bffb5",
      wickDownColor: "#838ca1",
      wickUpColor: "#838ca1",
      pane: 0,
    });

    candleSeries.setData(newPriceData);
  }, []);

  // Resize chart on container resizes.
  // useEffect(() => {
  //   resizeObserver.current = new ResizeObserver((entries) => {
  //     const { width, height } = entries[0].contentRect;
  //     chart.current.applyOptions({ width, height });
  //     setTimeout(() => {
  //       chart.current.timeScale().fitContent();
  //     }, 0);
  //   });

  //   resizeObserver.current.observe(chartContainerRef.current);

  //   return () => resizeObserver.current.disconnect();
  // }, []);

  return (
    <div>
      <h1>ChartComponent</h1>
      <div ref={chartContainerRef} />
    </div>
  );
};

export default ChartComponent;
