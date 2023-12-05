import React, { useRef, useState } from "react"
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

const ForecastList = (props: { forecasts: Array<any> }) => {
  const [fiveDayForecast, setFiveDayForecast] = useState(
    (props.forecasts as any)?.DailyForecasts,
  )
  const forecastRef = useRef<any>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : fiveDayForecast.length 
    );
    scrollIntoView()
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < fiveDayForecast.length - 1 ? prevIndex + 1 : 0
    );
    scrollIntoView()
  };

  const scrollIntoView = () => {
    if (forecastRef.current) {
      forecastRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  };

  return (
    <div className="p-4 relative">
    <h2 className="text-2xl mt-2 font-semibold mb-4">Daily Forecasts</h2>
    <div className="flex gap-6 overflow-x-auto py-2">
      <button
        className="text-gray-500 absolute left-0 before:bg-none top-[11rem] p-2 z-10 hover:bg-slate-50 rounded-full transform -translate-y-1/2 focus:outline-none"
        onClick={handlePrevClick}
      >
        <FaChevronLeft size={30} />
      </button>
        {fiveDayForecast.map((forecast: any, index: number) => (
          <div
          ref={currentIndex === index ? forecastRef : null}
            key={index}
            className={`flex-none w-[20rem] bg-white shadow bg-none rounded-lg  m-2 p-4 transition-transform transform ${
              index === currentIndex ? 'scale-105' : ''
            }`}
          >
            <h3 className="font-semibold">
              {daysOfWeek[new Date(forecast.Date).getDay()]}
            </h3>
            <br />
            <p>
              <strong>Day:</strong> {forecast.Day.IconPhrase}
              <br />
              <strong>Night:</strong> {forecast.Night.IconPhrase}
              <br />
              <strong>Max Temp:</strong> {forecast.Temperature.Maximum.Value}°F
              <br />
              <strong>Min Temp:</strong> {forecast.Temperature.Minimum.Value}°F
            </p>
          </div>
        ))}
         <button
          className="text-gray-500 absolute right-0 top-[11rem] p-2 text-center bg-none z-10 hover:bg-slate-50 rounded-full transform -translate-y-1/2 focus:outline-none"
          onClick={handleNextClick}
        >
          <FaChevronRight size={30} />
        </button>
      </div>
    </div>
  )
}

export default ForecastList
