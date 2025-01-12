import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';


const CryptoChart = ({ data, buySellMarkers }) => {
  const chartContainerRef: any = useRef();

  useEffect(() => {
    // Create the chart
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        backgroundColor: '#ffffff',
        textColor: '#000',
      },
      grid: {
        vertLines: {
          color: '#e1e1e1',
        },
        horzLines: {
          color: '#e1e1e1',
        },
      },
      crosshair: {
        mode: 0, // Normal crosshair mode
      },
      priceScale: {
        borderColor: '#ccc',
      },
      timeScale: {
        borderColor: '#ccc',
      },
    });

    // Add the candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#4caf50',
      downColor: '#f44336',
      borderUpColor: '#4caf50',
      borderDownColor: '#f44336',
      wickUpColor: '#4caf50',
      wickDownColor: '#f44336',
    });

    // Set candlestick data
    candlestickSeries.setData(data);

    // Add buy/sell markers
    if (buySellMarkers) {
      candlestickSeries.setMarkers(buySellMarkers);
    }

    // Resize chart on window resize
    const handleResize = () => {
      chart.resize(chartContainerRef.current.clientWidth, 400);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data, buySellMarkers]);

  return <div ref={chartContainerRef} style={{ position: 'relative', width: '100%', height: '400px' }} />;
};




const App = () => {
  // Example candlestick data
  const chartData = [
    { time: '2023-01-01', open: 100, high: 110, low: 90, close: 105 },
    { time: '2023-01-02', open: 105, high: 115, low: 100, close: 110 },
    { time: '2023-01-03', open: 110, high: 120, low: 105, close: 115 },
    { time: '2023-01-04', open: 115, high: 125, low: 110, close: 120 },
    { time: '2023-01-05', open: 120, high: 130, low: 115, close: 125 },
  ];

  // Example buy/sell markers
  const buySellMarkers = [
    {
      time: '2023-01-02', // Time of the marker (must match a candlestick)
      position: 'belowBar', // Marker position (above or below the bar)
      color: 'green', // Marker color
      shape: 'arrowUp', // Marker shape
      text: 'Bought at $105', // Tooltip text
    },
    {
      time: '2023-01-04', // Time of the marker
      position: 'aboveBar', // Marker position
      color: 'red', // Marker color
      shape: 'arrowDown', // Marker shape
      text: 'Sold at $120', // Tooltip text
    },
  ];

  return (
    <div>
      <h1>Crypto Trading Chart</h1>
      <CryptoChart data={chartData} buySellMarkers={buySellMarkers} />
    </div>
  );
};

export default App;

