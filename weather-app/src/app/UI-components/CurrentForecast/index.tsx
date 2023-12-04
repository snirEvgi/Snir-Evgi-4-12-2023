import { useState, useEffect } from 'react';
import { FaHeart, FaTrash } from 'react-icons/fa';

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

const CurrentForecast = ({ currentForecast, header }: CurrentForecastProps) => {
  const [likedPlaces, setLikedPlaces] = useState<string[]>([]);

  useEffect(() => {
    const storedLikedPlaces = localStorage.getItem("likedPlaces");
    if (storedLikedPlaces) {
      setLikedPlaces(JSON.parse(storedLikedPlaces));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("likedPlaces", JSON.stringify(likedPlaces));
  }, [likedPlaces]);

  
  const handleToggleLike = () => {
    console.log(currentForecast,"sasasa");
    
    // Check if the place is already liked
    if (likedPlaces.includes(currentForecast.Key)) {
      // Remove from liked places if already liked
      setLikedPlaces((prevLikedPlaces) =>
        prevLikedPlaces.filter((place) => place !== currentForecast.LocalizedName)
      );
    } else {
      // Add to liked places if not liked
      setLikedPlaces((prevLikedPlaces) => [...prevLikedPlaces, currentForecast]);
    }
  };

  const isLiked = likedPlaces.includes(currentForecast.Key);

  return (
    <div className="max-w-sm relative flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Current Forecast
            </h3>
            <div className="flex items-center space-x-2">
          
              <button
                className={`text-2xl transition ${
                  isLiked ? 'text-red-500' : 'text-gray-500'
                }`}
                onClick={handleToggleLike}
              >
                <FaHeart className={`cursor-pointer ${isLiked ? 'fill-current' : 'stroke-current'}`} />
              </button>
            </div>
          </div>
          <div className="mt-5 flex-col flex items-start flex-wrap space-y-2">
            <p className="flex flex-col items-start justify-start text-sm text-gray-500">
              <span className="text-lg text-gray-500">
                <strong>{daysOfWeek[new Date(currentForecast.LocalObservationDateTime).getDay()]}</strong>
              </span>
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
