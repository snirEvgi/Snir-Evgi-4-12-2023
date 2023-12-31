
import { Bar } from "react-chartjs-2"
import "chart.js/auto"
import { useEffect, useRef, useState } from "react"
import { useAppSelector } from "../../hooks"
import classNames from "classnames"
import { daysOfWeek } from "../../pages/FavoritePage"
import {  DailyForecast } from "../../models"


interface DataVisualHomeProps {
  forecasts: Array<DailyForecast>;
}

const DataVisualHome = ({forecasts}: DataVisualHomeProps) => {
    const [fiveDayForecast, setFiveDayForecast] = useState(
        (forecasts as any)?.DailyForecasts,
      )

     
      const theme = localStorage.getItem("theme")
const data = {
    labels: fiveDayForecast.map(
      (forecast: any) => daysOfWeek[new Date(forecast.Date).getDay()],
    ),
    datasets: [
      {
        label: "Maximum Temperature (°F)",
        data: fiveDayForecast.map(
          (forecast: DailyForecast) => forecast.Temperature.Maximum.Value,
        ),
        backgroundColor: `${theme === "dark" ? "purple" : "darkRed"}`,
      },
      {
        label: "Minimum Temperature (°F)",
        data: fiveDayForecast.map(
          (forecast: DailyForecast) => forecast.Temperature.Minimum.Value,
        ),
        backgroundColor: `${theme === "dark" ? "darkBlue" : "lightGreen"}`,
      },
    ],
  }

  const options = {
    scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: theme === "dark" ?"white" : "", 
          },
          ticks: {
            color: theme === "dark" ?"white" : "", 
          }
        },
        x: {
          grid: {
            color: theme === "dark" ?"white" : "", 
          },
          ticks: {
            color: theme === "dark" ?"white" : "", 
          }
        }
      },
    plugins: {
      legend: {
        display: false,
      },
    },
  }
  return (
<div className={classNames({
    "p-4 shadow-lg  rounded-lg duration-500 ease-in  transition-colors max-w-sm min-w-[345px]":true,
    "bg-white opacity-70 text-black":theme==="light",
    "bg-gray-500 opacity-90 text-white": theme === "dark",
    })}>
    <h2 className="text-2xl text-black font-semibold mb-4">Daily Temperature Visual</h2>
      <div className="flex items-center justify-center gap-6 py-2">
    <div className="max-w-sm min-w-[225px] flex justify-center  mr-2 text-white">
          <Bar data={data}  options={options} />
        </div>
      </div>
      </div>
  )
}

export default DataVisualHome


