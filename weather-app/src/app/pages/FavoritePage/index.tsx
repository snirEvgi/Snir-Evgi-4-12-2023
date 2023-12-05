import { Toast } from "primereact/toast"
import { useEffect, useRef, useState } from "react"
import { FaHeart } from "react-icons/fa"
import { IoHeartDislike } from "react-icons/io5"

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]
const MAX_LIKED = 5

const FavoritePage = () => {
    const [favoriteList, setFavoriteList] = useState<any[]>(
        JSON.parse(localStorage.getItem('likedPlaces') as string) || []
      );
      const [currentForecast ,setCurrentForecast ] = useState<any>({})
      const toast = useRef<Toast | null>(null);
    
      
  const handleRemoveLike = (place: any) => {
    setCurrentForecast(place)
    const placeIdentifier = place.MobileLink;
    const isLiked = favoriteList.some((p: any) => p.MobileLink === placeIdentifier);
    // Remove from liked places if already liked
    const updatedList = favoriteList.filter((p: any) => p.MobileLink !== placeIdentifier);
          setFavoriteList(updatedList);
          localStorage.setItem('likedPlaces', JSON.stringify(updatedList));
  }
  const placeIdentifier = currentForecast.MobileLink
  const isLiked = favoriteList.some(
    (place: any) => place.MobileLink === placeIdentifier,
  )
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Toast ref={toast} />

      <h2 className="text-2xl font-semibold text-center mb-6">Favorite Forecasts</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {favoriteList.map((place:any, index:number) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">{daysOfWeek[new Date(place.LocalObservationDateTime).getDay()]}</h3>
                <button onClick={() => handleRemoveLike(place)} className="text-2xl text-gray-500 transition-colors">
                  <IoHeartDislike className="cursor-pointer" />
                </button>
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={`path_to_weather_icons/${place.WeatherIcon}.svg`}
                  alt="Weather icon"
                  className="w-12 h-12"
                />
                <div className="flex flex-col">
                  <span className="text-lg">{place.WeatherText}</span>
                  <span className="text-sm text-gray-500">
                    Temp: {place.Temperature.Imperial.Value}°F / {place.Temperature.Metric.Value}°C
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
