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
let arr:any = []

const CurrentForecast = ({ currentForecast, header }: CurrentForecastProps) => {
  const [favoriteList, setFavoriteList] = useState<any[]>(
    JSON.parse(localStorage.getItem('likedPlaces') as string) || []
  );
  const toast = useRef<Toast | null>(null);

  const handleToggleLike = (place: any) => {
    const placeIdentifier = place.MobileLink;
    const isLiked = favoriteList.some((p: any) => p.MobileLink === placeIdentifier);

    if (!isLiked) {
      //  if the maximum limit is reached
      if (favoriteList.length < MAX_LIKED) {
        // state and local storage
        const updatedList = [...favoriteList, place];
        setFavoriteList(updatedList);
        localStorage.setItem('likedPlaces', JSON.stringify(updatedList));
      } else {
        if (toast.current) {
          toast.current.show({
            severity: 'warn',
            summary: 'Maximum Liked Places Reached',
            detail: `You can only like up to ${MAX_LIKED} places.`,
          });
        }
      }
    } else {
      // remove of the liked place 
      const updatedList = favoriteList.filter((p: any) => p.MobileLink !== placeIdentifier);
      setFavoriteList(updatedList);
      localStorage.setItem('likedPlaces', JSON.stringify(updatedList));
    }
  };

  const placeIdentifier = currentForecast.MobileLink;
  const isLiked = favoriteList.some((p: any) => p.MobileLink === placeIdentifier);

  return (
    <div className="max-w-sm flex items-center justify-center">
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
                onClick={()=>handleToggleLike(currentForecast)}
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
