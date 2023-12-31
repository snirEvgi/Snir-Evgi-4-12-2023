import { Toast } from "primereact/toast"
import { useEffect, useRef, useState } from "react"
import { IoHeartDislike, IoSunnyOutline } from "react-icons/io5"
import { FaRegMoon, FaTemperatureLow } from "react-icons/fa"
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from "react-icons/tb"
import classnames from "classnames"
import Swal from "sweetalert2"
import classNames from "classnames"
import { useNavigate } from "react-router-dom"
import { CurrentPlaceForecast } from "../../models"

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
  const [favoriteList, setFavoriteList] = useState <Array<CurrentPlaceForecast>>(
    JSON.parse(localStorage.getItem("likedPlaces") as string) || [],
  )
  const [isOnFahrenheit, setIsOnFahrenheit] = useState<boolean>(false)
  const toast = useRef<Toast | null>(null)
  const theme = localStorage.getItem("theme")
  const navigate = useNavigate()


  

  const getNumberFromUrl = (url: string) => {
    // regex to check the link for the number
    const match = url.match(/\/(\d+)\/current-weather/)
    // check if there is a match
    if (match && match[1]) {
      const extractedNumber = match[1]
      return extractedNumber
    }
    return
  }
  const handleClickFavorite = async (place: CurrentPlaceForecast) => {
    const number = getNumberFromUrl(place?.MobileLink)
    const key = number?.toString()
    const data = [place, key]
    localStorage.setItem("currentFavoriteLocation", JSON.stringify(data))
    navigate("/")
  }
  const handleRemoveLike = (place: CurrentPlaceForecast) => {
    const placeIdentifier = place.MobileLink
    return Swal.fire({
      title: `Are you sure you want to remove ${place.LocalizedName}?`,
      // text: "",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
      showCancelButton: true,
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (!result.isConfirmed) {
      } else {
        const updatedList = favoriteList.filter(
          (place: CurrentPlaceForecast) => place.MobileLink !== placeIdentifier,
        )
        setFavoriteList(updatedList)
        localStorage.setItem("likedPlaces", JSON.stringify(updatedList))
      }
    })
  }

  const handleTemperatureIndicatorSelect = () => {
    setIsOnFahrenheit(!isOnFahrenheit)
  }

  return (
    <div
      className={classnames({
        "max-w-screen min-h-screen duration-300 mt-10 ease-in transition-colors bg-none mx-auto p-4":
          true,
        "text-white": theme === "dark",
      })}
    >
      <Toast ref={toast} />

      <h2 className="text-2xl  font-semibold text-center mb-20">
        Favorite Forecasts
      </h2>
      {
  !favoriteList.length && (
    <div className="flex justify-center items-center p-10">
     
        <p className="text-lg font-semibold">No favorites added yet.</p>
      </div>
  )
}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {favoriteList.map((place: CurrentPlaceForecast, index: number) => (
          <div
            key={index}
            className={classnames({
              " shadow-lg font-bold   opacity-70 min-h-[18rem] rounded-lg overflow-hidden":
                true,
              "bg-gray-500 opacity-90": theme === "dark",
              "bg-white": theme === "light",
            })}
          >
            <div className="p-6 ">
              <div className="flex justify-between items-center min-h-10 max-h-10 mb-4">
                <h3 className="text-lg font-medium">{place.LocalizedName}</h3>
                {isOnFahrenheit ? (
                  <button
                    onClick={() => handleTemperatureIndicatorSelect()}
                    className={classNames({
                      "text-2xl rounded-full mt-1  p-2 min-h-[2rem] ": true,
                      "  hover:text-gray-800  hover:bg-gray-300":
                        theme === "dark",
                      "  hover:text-gray-200  hover:bg-gray-800":
                        theme === "light",
                    })}
                  >
                    <TbTemperatureCelsius className=" cursor-pointer" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleTemperatureIndicatorSelect()}
                    className={classNames({
                      "text-2xl rounded-full mt-1  p-2 min-h-[2rem] ": true,
                      "  hover:text-gray-800  hover:bg-gray-300":
                        theme === "dark",
                      "  hover:text-gray-200  hover:bg-gray-800":
                        theme === "light",
                    })}
                  >
                    <TbTemperatureFahrenheit className=" cursor-pointer" />
                  </button>
                )}
                <button
                  onClick={() => handleRemoveLike(place)}
                  className={classNames({
                    "text-2xl rounded-full mt-2  p-2 min-h-[2rem] ": true,
                    "  hover:text-gray-800  hover:bg-gray-300":
                      theme === "dark",
                    "  hover:text-gray-200  hover:bg-gray-800":
                      theme === "light",
                  })}
                >
                  <IoHeartDislike className=" cursor-pointer" />
                </button>
              </div>

              <div className="flex my-2 items-center space-x-4 mb-4">
                <div className="flex flex-col">
                  <span className="text-lg">{place.WeatherText}</span>
                  <span className=" flex items-center gap-3 text-lg">
                    Currently:{" "}
                    {place.IsDayTime ? (
                      <IoSunnyOutline
                        className="text-yellow-500 mt-1 "
                        size={30}
                      />
                    ) : (
                      <FaRegMoon className="mt-1" size={20} />
                    )}
                  </span>

                  <span className="text-lg min-w-full mt-3 my-2 ">
                    {!isOnFahrenheit ? (
                      <span className="flex gap-7 items-center justify-start min-w-[5rem]">
                        {place.Temperature.Imperial.Value} °F{" "}
                        <FaTemperatureLow size={22} />{" "}
                      </span>
                    ) : (
                      <span className="flex gap-x-7 justify-start min-w-[5rem items-center">
                        {" "}
                        {place.Temperature.Metric.Value}°C{" "}
                        <FaTemperatureLow size={22} />{" "}
                      </span>
                    )}
                  </span>
                </div>
              </div>
              <br />
              <div className="text-sm">
        </div>
              <br />
              <span
                onClick={() => handleClickFavorite(place)}
                className="text-blue-500 cursor-pointer hover:text-blue-700 "
              >
               Set View To Homepage
              </span>
            </div>
          </div>
        ))}
 
      </div>
      
    </div>
  )
}

export default FavoritePage
