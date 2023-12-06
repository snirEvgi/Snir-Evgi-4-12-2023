import { Toast } from "primereact/toast"
import { useEffect, useRef, useState } from "react"
import { IoHeartDislike, IoSunnyOutline } from "react-icons/io5"
import { FaRegMoon, FaTemperatureLow } from "react-icons/fa"
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from "react-icons/tb"
import classnames from "classnames"
import { useAppSelector } from "../../hooks"

export const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

const FavoritePage = () => {
  const [favoriteList, setFavoriteList] = useState<any[]>(
    JSON.parse(localStorage.getItem('likedPlaces') as string) ||[]
    // [
    //   {
    //     LocalObservationDateTime: "2023-12-04T07:10:00-05:00",
    //     EpochTime: 1701691800,
    //     WeatherText: "Mostly cloudy",
    //     WeatherIcon: 6,
    //     HasPrecipitation: false,
    //     PrecipitationType: null,
    //     IsDayTime: true,
    //     Temperature: {
    //       Metric: {
    //         Value: 21.6,
    //         Unit: "C",
    //         UnitType: 17,
    //       },
    //       Imperial: {
    //         Value: 71,
    //         Unit: "F",
    //         UnitType: 18,
    //       },
    //     },
    //     MobileLink:
    //       "http://www.accuweather.com/en/ec/los-angeles/1239134/current-weather/1239134?lang=en-us",
    //     Link: "http://www.accuweather.com/en/ec/los-angeles/1239134/current-weather/1239134?lang=en-us",
    //   },
    //   {
    //     LocalObservationDateTime: "2023-12-04T07:10:00-05:00",
    //     EpochTime: 1701691800,
    //     WeatherText: "Mostly cloudy",
    //     WeatherIcon: 6,
    //     HasPrecipitation: false,
    //     PrecipitationType: null,
    //     IsDayTime: true,
    //     Temperature: {
    //       Metric: {
    //         Value: 21.6,
    //         Unit: "C",
    //         UnitType: 17,
    //       },
    //       Imperial: {
    //         Value: 71,
    //         Unit: "F",
    //         UnitType: 18,
    //       },
    //     },
    //     MobileLink:
    //       "httap://www.aaccuweather.com/en/ec/los-angeles/1239134/current-weather/1239134?lang=en-us",
    //     Link: "htatp://waww.accuweather.com/en/ec/los-angeles/1239134/current-weather/1239134?lang=en-us",
    //   },
    //   {
    //     LocalObservationDateTime: "2023-12-04T07:10:00-05:00",
    //     EpochTime: 1701691800,
    //     WeatherText: "Mostly cloudy",
    //     WeatherIcon: 6,
    //     HasPrecipitation: false,
    //     PrecipitationType: null,
    //     IsDayTime: true,
    //     Temperature: {
    //       Metric: {
    //         Value: 21.6,
    //         Unit: "C",
    //         UnitType: 17,
    //       },
    //       Imperial: {
    //         Value: 71,
    //         Unit: "F",
    //         UnitType: 18,
    //       },
    //     },
    //     MobileLink:
    //       "http://www.accuwaeather.com/en/ec/los-angeles/1239134/current-weather/1239134?lang=en-us",
    //     Link: "http://www.acacuweather.com/en/ec/los-angeles/1239134/current-weather/1239134?lang=en-us",
    //   },
    //   {
    //     LocalObservationDateTime: "2023-12-04T07:10:00-05:00",
    //     EpochTime: 1701691800,
    //     WeatherText: "Mostly cloudy",
    //     WeatherIcon: 6,
    //     HasPrecipitation: false,
    //     PrecipitationType: null,
    //     IsDayTime: true,
    //     Temperature: {
    //       Metric: {
    //         Value: 21.6,
    //         Unit: "C",
    //         UnitType: 17,
    //       },
    //       Imperial: {
    //         Value: 71,
    //         Unit: "F",
    //         UnitType: 18,
    //       },
    //     },
    //     MobileLink:
    //       "http://www.accuweasather.com/en/ec/los-angeles/1239134/current-weather/1239134?lang=en-us",
    //     Link: "http://www.accsauweather.com/en/ec/los-angeles/1239134/current-weather/1239134?lang=en-us",
    //   },
    //   {
    //     LocalObservationDateTime: "2023-12-04T07:10:00-05:00",
    //     EpochTime: 1701691800,
    //     WeatherText: "Mostly cloudy",
    //     WeatherIcon: 6,
    //     HasPrecipitation: false,
    //     PrecipitationType: null,
    //     IsDayTime: false,
    //     Temperature: {
    //       Metric: {
    //         Value: 21.6,
    //         Unit: "C",
    //         UnitType: 17,
    //       },
    //       Imperial: {
    //         Value: 71,
    //         Unit: "F",
    //         UnitType: 18,
    //       },
    //     },
    //     MobileLink:
    //       "http://www.accuweather.com/en/ec/slos-angeles/1239134/current-weather/1239134?lang=en-us",
    //     Link: "http://www.accuweather.com/ens/ec/los-angeles/1239134/current-weather/1239134?lang=en-us",
    //   },
    // ],
  )
  const toast = useRef<Toast | null>(null)
  const [isOnFahrenheit, setIsOnFahrenheit] = useState<boolean>(false)
  const currentTheme = useAppSelector((state) => state.theme.theme) || "light"
  const theme = localStorage.getItem("theme")
  const handleRemoveLike = (place: any) => {
    const placeIdentifier = place.MobileLink
    const updatedList = favoriteList.filter(
      (p: any) => p.MobileLink !== placeIdentifier,
    )
    setFavoriteList(updatedList)
    localStorage.setItem("likedPlaces", JSON.stringify(updatedList))
  }

  const handleTemperatureIndicatorSelect = () => {
    setIsOnFahrenheit(!isOnFahrenheit)
  }

  return (
    <div
      className={classnames({
        "max-w-screen min-h-screen bg-none mx-auto p-4": true,
        "text-white": currentTheme === "dark",
      })}
    >
      <Toast ref={toast} />

      <h2 className="text-2xl font-semibold text-center mb-6">
        Favorite Forecasts
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {favoriteList.map((place: any, index: number) => (
          <div
            key={index}
            className={classnames({
              " shadow-lg font-bold   opacity-70 min-h-[18rem] rounded-lg overflow-hidden": true,
              "bg-gray-500 opacity-90": theme === "dark",
              "bg-white": theme === "light",
            })}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">
                  {
                    place.LocalizedName
                  }
                </h3>
                {isOnFahrenheit ? (
                  <button
                    onClick={() => handleTemperatureIndicatorSelect()}
                    className="text-2xl  transition-colors"
                  >
                    <TbTemperatureCelsius className="mt-1 cursor-pointer" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleTemperatureIndicatorSelect()}
                    className="text-2xl  transition-colors"
                  >
                    <TbTemperatureFahrenheit className=" mt-1 cursor-pointer" />
                  </button>
                )}
                <button
                  onClick={() => handleRemoveLike(place)}
                  className="text-2xl transition-colors"
                >
                  <IoHeartDislike className="mt-2 cursor-pointer" />
                </button>
              </div>

              <div className="flex my-2 items-center space-x-4 mb-4">
                <div className="flex flex-col">
                  <span className="text-lg">{place.WeatherText}</span>
                  <span className=" flex items-center gap-3 text-lg">
                    Currently:{" "}
                    {place.IsDayTime ? (
                      <IoSunnyOutline className="text-yellow-500 mt-1 " size={30} />
                    ) : (
                      <FaRegMoon className="mt-1" size={20}/>
                    )}
                  </span>

                  <span className="text-lg my-2 ">
                    {!isOnFahrenheit ? (
                      <span className="flex gap-2">
                        {place.Temperature.Imperial.Value} °F{" "}
                        <span className="mt-1">
                          {" "}
                          <FaTemperatureLow size={22} />{" "}
                        </span>
                      </span>
                    ) : (
                      <span className="flex gap-2 items-center">
                        {" "}
                        {place.Temperature.Metric.Value}°C <FaTemperatureLow />{" "}
                      </span>
                    )}
                  </span>
                </div>
              </div>

              <a
                href={place.Link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FavoritePage
