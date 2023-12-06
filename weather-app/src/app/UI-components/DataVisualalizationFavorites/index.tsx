import { Bar } from "react-chartjs-2"
import "chart.js/auto"
import { useState } from "react"
import { useAppSelector } from "../../hooks"
import classNames from "classnames"
import { daysOfWeek } from "../../pages/FavoritePage"
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from "react-icons/tb"

const DataVisualFavorites = () => {
  const [favoriteList, setFavoriteList] = useState<any[]>(
    JSON.parse(localStorage.getItem("likedPlaces") as string) || [],
  )
  const [isCel, setIsCel] = useState<any[]>(
    JSON.parse(localStorage.getItem("likedPlaces") as string) || [],
  )
  // const [fiveDayForecast, setFiveDayForecast] = useState(
  //     (props.forecasts as any)?.DailyForecasts,
  //   )
  const theme = localStorage.getItem("theme")
  const data = {
    labels: favoriteList.map(
      (forecast: any) => daysOfWeek[new Date(forecast.Date).getDay()],
    ),
    datasets: [
      {
        label: "Temperature (°C)",
        data: favoriteList.map(
          (forecast: any) => forecast.Temperature.Metric.Value,
        ),
        backgroundColor: `${theme === "dark" ? "purple" : "darkRed"}`,
      },
    ],
  }
  const data2 = {
    labels: favoriteList.map(
      (forecast: any) => daysOfWeek[new Date(forecast.Date).getDay()],
    ),
    datasets: [
      {
        label: "Temperature (°F)",
        data: favoriteList.map(
          (forecast: any) => forecast.Temperature.Minimum.Value,
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
          color: theme === "dark" ? "white" : "",
        },
        ticks: {
          color: theme === "dark" ? "white" : "",
        },
      },
      x: {
        grid: {
          color: theme === "dark" ? "white" : "",
        },
        ticks: {
          color: theme === "dark" ? "white" : "",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  }
  return (
    <div
      className={classNames({
        "p-4 shadow-lg rounded-lg max-w-sm": true,
        "bg-white opacity-70 text-black": theme === "light",
        "bg-gray-500 opacity-90 text-white": theme === "dark",
      })}
    >
      <h2 className="text-2xl text-black font-semibold mb-4">
        Daily Temperature Visual
      </h2>
      <div className="flex items-center justify-center gap-6 py-2">
        <button className="text-2xl rounded-full mt-1 hover:text-gray-800 duration-300 ease-in hover:bg-gray-300 p-2 min-h-[2rem] transition-colors">
          <TbTemperatureCelsius className=" cursor-pointer" />
        </button>

        <button className="text-2xl p-2 min-h-[2rem] duration-300 ease-in transition-colors">
          <TbTemperatureFahrenheit className=" cursor-pointer" />
        </button>

        <div className="max-w-sm   text-white">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  )
}

export default DataVisualFavorites
