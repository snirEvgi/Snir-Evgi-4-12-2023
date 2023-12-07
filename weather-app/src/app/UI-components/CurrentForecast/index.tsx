import { useState, useEffect, useRef } from "react"
import { FaHeart } from "react-icons/fa"
import { Toast } from "primereact/toast"
import { IoHeartDislike } from "react-icons/io5"
import classNames from "classnames"
import Swal from "sweetalert2"
import { daysOfWeek } from "../../pages/FavoritePage"
import { CurrentPlaceForecast } from "../../models"

interface CurrentForecastProps {
  currentForecast: any | {}
  header?: string

  func:()=>void
}

const MAX_LIKED = 5

const CurrentForecast = ({
  currentForecast,
  header,
  func
}: CurrentForecastProps) => {
  const theme = localStorage.getItem("theme")
  const [favoriteList, setFavoriteList] = useState<Array<CurrentPlaceForecast>>(
    JSON.parse(localStorage.getItem("likedPlaces") as string) || [],
  )
  const isInitiallyLiked = favoriteList.some(
    (p: any) => p.MobileLink === currentForecast.MobileLink,
  )
  const [isShown, setIsShown] = useState<boolean>(isInitiallyLiked)
  const toast = useRef<Toast | null>(null)

  

  const handleToggleLike = (place: CurrentPlaceForecast) => {
    const placeIdentifier = place.MobileLink
    const currentlyLiked = favoriteList.some(
      (p: any) => p.MobileLink === placeIdentifier,
    )
    if (!currentlyLiked) {
      setIsShown(true)
      //  if the maximum limit is reached
      if (favoriteList.length < MAX_LIKED) {
        // state and local storage
        const updatedList = [
          ...favoriteList,
          { ...place, LocalizedName: header },
        ]
        setFavoriteList(updatedList)
        localStorage.setItem("likedPlaces", JSON.stringify(updatedList))
        toast?.current?.show({
          severity: "success",
          summary: "Added successfully",
          detail: ` ${header} added to your favorite list.`,
        })
      } else {
        if (toast.current) {
          toast.current.show({
            severity: "warn",
            summary: "Maximum Liked Places Reached",
            detail: `You can only like up to ${MAX_LIKED} places.`,
          })
        }
      }
    } else {
      // remove of the liked place
      return Swal.fire({
        title: `Are you sure you want to remove ${header}?`,
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
            (place: CurrentPlaceForecast) =>
              place.MobileLink !== placeIdentifier,
          )
          setIsShown(false)
          setFavoriteList(updatedList)
          localStorage.setItem("likedPlaces", JSON.stringify(updatedList))
        }
      })
    }
  }
  useEffect(() => {
    const isLikedUpdate = favoriteList.some(
      (place: CurrentPlaceForecast) =>
        place.MobileLink === currentForecast.MobileLink,
    )
    setIsShown(isLikedUpdate)
  }, [favoriteList, currentForecast])
 

  return (
    <div className="max-w-sm flex min-w-[345px]  overflow-x-scroll items-center justify-center">
      <Toast ref={toast} />

      <div
        className={classNames({
          " shadow-lg rounded-lg font-bold duration-500 ease-in  transition-colors  overflow-hidden w-full":
            true,
          "bg-white opacity-70 text-black": theme === "light",
          "bg-gray-500 opacity-90 text-white": theme === "dark",
        })}
      >
        <div className="px-4 py-5  sm:p-6">
         
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-black">{header} - Today</h3>
            <br />

            <div className="flex items-center space-x-2">
              <button
                className={classNames({
                  "text-2xl   p-3 rounded-full  text-red-500 font-bold transition-colors duration-300 ease-in ":
                    true,
                  "hover:bg-gray-500  hover:text-slate-50": theme === "light",
                  "hover:bg-white  hover:text-gray-500": theme === "dark",
                })}
                onClick={() => handleToggleLike(currentForecast)}
              >
                {!isShown ? (
                  <FaHeart className={`cursor-pointer  `} />
                ) : (
                  <IoHeartDislike className={`cursor-pointer `} />
                )}
              </button>
            </div>
          </div>
          <div className="mt-5 flex-col flex items-start flex-wrap space-y-2">
            <p className="flex flex-col items-start justify-start text-sm ">
              <span className="text-lg ">
                <strong>
                  {
                    daysOfWeek[
                      new Date(
                        currentForecast.LocalObservationDateTime,
                      ).getDay()
                    ]
                  }
                </strong>
              </span>
              <br />
              <span className="text-sm ">
                <strong>Weather:</strong> {currentForecast.WeatherText}
              </span>
            </p>
            <span className="text-sm ">
              <strong>Temp (F):</strong>{" "}
              {currentForecast.Temperature.Imperial.Value}°F
            </span>
            <span className="text-sm ">
              <strong>Temp (C):</strong>{" "}
              {currentForecast.Temperature.Metric.Value}°C
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentForecast
