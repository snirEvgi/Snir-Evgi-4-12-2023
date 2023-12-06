import { useState, useEffect, useRef } from 'react';
import { FaHeart } from 'react-icons/fa';
import { Toast } from "primereact/toast"
import { IoHeartDislike } from "react-icons/io5";
import { useAppSelector } from '../../hooks';
import classNames from 'classnames';
import Swal from 'sweetalert2';
import { daysOfWeek } from '../../pages/FavoritePage';

interface CurrentForecastProps {
  currentForecast: any | {};
  header?: string;
  
}


const MAX_LIKED = 5;

const CurrentForecast = ({ currentForecast, header }: CurrentForecastProps) => {
  const theme = localStorage.getItem("theme")
  const [favoriteList, setFavoriteList] = useState<any[]>(
    JSON.parse(localStorage.getItem('likedPlaces') as string) || []);
  const isInitiallyLiked = favoriteList.some((p: any) => p.MobileLink === currentForecast.MobileLink);
  const [isShown, setIsShown] = useState<boolean>(isInitiallyLiked)
  const toast = useRef<Toast | null>(null);
  
  const handleToggleLike = (place: any) => {
    const placeIdentifier = place.MobileLink;
    const currentlyLiked = favoriteList.some((p: any) => p.MobileLink === placeIdentifier);
    if (!currentlyLiked) {
      setIsShown(true)
      //  if the maximum limit is reached
      if (favoriteList.length < MAX_LIKED) {
        // state and local storage
        const updatedList = [...favoriteList, { ...place, LocalizedName: header }];
          setFavoriteList(updatedList);
        localStorage.setItem('likedPlaces', JSON.stringify(updatedList));
        toast?.current?.show({
          severity: 'success',
          summary: 'Added successfully',
          detail: ` ${header} added to your favorite list.`,
        });
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
      return Swal.fire({
        title: `Are you sure you want to remove ${header}?`,
        // text: "",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm",
        showCancelButton: true,
        // cancelButtonText: "Cancel",
    }).then((result) => {
        if (!result.isConfirmed) {

        } else {
          const updatedList = favoriteList.filter((p: any) => p.MobileLink !== placeIdentifier);
          setIsShown(false)
          setFavoriteList(updatedList);
          localStorage.setItem('likedPlaces', JSON.stringify(updatedList));
        }

    });
     
    }
  };
  useEffect(() => {
    const isLikedUpdate = favoriteList.some((p: any) => p.MobileLink === currentForecast.MobileLink);
    setIsShown(isLikedUpdate);
  }, [favoriteList, currentForecast]);

  return (
    <div className="max-w-sm flex items-center justify-center">
      <Toast ref={toast} />

      <div className={classNames({
        " shadow-lg rounded-lg font-bold  overflow-hidden w-full":true,
        "bg-white opacity-70 text-black": theme ==="light",
        "bg-gray-500 opacity-90 text-white": theme ==="dark"


    })}>
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-black">
              {header} Forecast
            </h3>
            <div className="flex items-center space-x-2">
          
              <button
                className={`text-2xl transition-colors text-red-500`}
                onClick={()=>handleToggleLike(currentForecast)}
              >
           {!isShown   ?  <FaHeart className={`cursor-pointer opacity-100  text-red-500`} /> : <IoHeartDislike className={`cursor-pointer `} />}
              </button>
            </div>
          </div>
          <div className="mt-5 flex-col flex items-start flex-wrap space-y-2">
            <p className="flex flex-col items-start justify-start text-sm ">
              <span className="text-lg ">
                <strong>{daysOfWeek[new Date(currentForecast.LocalObservationDateTime).getDay()]}</strong>
              </span>
              <br />
              <span className="text-sm ">
                <strong>Weather:</strong> {currentForecast.WeatherText}
              </span>
            </p>
            <span className="text-sm ">
              <strong>Temp (F):</strong>{' '}
              {currentForecast.Temperature.Imperial.Value}°F
            </span>
            <span className="text-sm ">
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
