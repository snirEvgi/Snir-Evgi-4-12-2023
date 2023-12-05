import { useState, useEffect, useRef } from 'react';
import { FaHeart } from 'react-icons/fa';
import { Toast } from "primereact/toast"
import { IoHeartDislike } from "react-icons/io5";

interface CurrentForecastProps {
  currentForecast: any | {};
  header?: string;
}

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const MAX_LIKED = 5;

const CurrentForecast = ({ currentForecast, header }: CurrentForecastProps) => {
  const storedLikedPlaces = JSON.parse(localStorage.getItem("likedPlaces") as any ) || [];
  const [likedPlaces, setLikedPlaces] = useState<string[]>(storedLikedPlaces);
  const toast = useRef<Toast | null>(null)

  

  // useEffect(() => {
    // if (storedLikedPlaces) {

    // }
  // }, []);

  // useEffect(() => {
  // }, [likedPlaces]);

  
  const handleToggleLike = () => {
    const placeIdentifier = currentForecast.MobileLink; 

    // Check if the place is already liked
    if (likedPlaces.some((place:any) => place.MobileLink === placeIdentifier)) {
      // Remove from liked places if already liked
      setLikedPlaces((prevLikedPlaces) =>
        prevLikedPlaces.filter((place:any) => place.MobileLink !== placeIdentifier)
      );

    localStorage.setItem("likedPlaces", JSON.stringify(likedPlaces));

    } else {
      // Add to liked places if not liked
      if (likedPlaces.length < MAX_LIKED) {
        setLikedPlaces((prevLikedPlaces) => [...prevLikedPlaces, currentForecast]);
      }else {
        return toast.current?.show({
          severity: "error",
          summary: "You can add until 5 users",
          detail: "You can add until 5 users. Please Remove one to continue.",
        })
      }
    }
  };

  const placeIdentifier = currentForecast.MobileLink; 
  const isLiked = likedPlaces.some((place:any) => place.MobileLink === placeIdentifier);
  return (
    <div className="max-w-sm relative flex items-center justify-center">
      <Toast ref={toast} />

      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              {header} Forecast
            </h3>
            <div className="flex items-center space-x-2">
          
              <button
                className={`text-2xl transition-colors text-red-500`}
                onClick={handleToggleLike}
              >
           {isLiked   ?  <FaHeart className={`cursor-pointer text-red-500`} /> : <IoHeartDislike className={`cursor-pointer text-gray-500`} />}
              </button>
            </div>
          </div>
          <div className="mt-5 flex-col flex items-start flex-wrap space-y-2">
            <p className="flex flex-col items-start justify-start text-sm text-gray-500">
              <span className="text-lg text-gray-500">
                <strong>{daysOfWeek[new Date(currentForecast.LocalObservationDateTime).getDay()]}</strong>
              </span>
              <br />
              <span className="text-sm text-gray-500">
                <strong>Weather:</strong> {currentForecast.WeatherText}
              </span>
            </p>
            <span className="text-sm text-gray-500">
              <strong>Temp (F):</strong>{' '}
              {currentForecast.Temperature.Imperial.Value}°F
            </span>
            <span className="text-sm text-gray-500">
              <strong>Temp (C):</strong>{' '}
              {currentForecast.Temperature.Metric.Value}°C
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentForecast;
