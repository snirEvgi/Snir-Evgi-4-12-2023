
import { Bar } from "react-chartjs-2"
import "chart.js/auto"
import { useState } from "react"

const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
const DataVisual = (props: { forecasts: Array<any> }) => {
    const [fiveDayForecast, setFiveDayForecast] = useState(
        (props.forecasts as any)?.DailyForecasts,
      )
    
const data = {
    labels: fiveDayForecast.map(
      (forecast: any) => daysOfWeek[new Date(forecast.Date).getDay()],
    ),
    datasets: [
      {
        label: "Maximum Temperature (°F)",
        data: fiveDayForecast.map(
          (forecast: any) => forecast.Temperature.Maximum.Value,
        ),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Minimum Temperature (°F)",
        data: fiveDayForecast.map(
          (forecast: any) => forecast.Temperature.Minimum.Value,
        ),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  }
  return (
<div className="bg-white p-4 max-w-sm">
    <h2 className="text-2xl font-semibold mb-4">Daily Temperature Visual</h2>
      <div className="flex gap-6 py-2">
    <div className="max-w-sm">
          <Bar data={data} options={options} />
        </div>
      </div>
      </div>
  )
}

export default DataVisual


