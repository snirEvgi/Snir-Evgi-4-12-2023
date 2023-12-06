import { useDeferredValue, useEffect, useRef, useState } from "react"
import { Toast } from "primereact/toast"
import { z } from "zod"
import { useAppDispatch, useAppSelector } from "../../hooks"
import {
  fetchCurrentForecast,
  fetchCurrentForecastWithGeoLocation,
  fetchFiveDayForecast,
  searchAutoComplete,
} from "./weatherSlice"
import { fetchTelAvivData } from "./homepageAPI"
import classnames from "classnames"
import ForecastList from "../../UI-components/ForecastList"
import CurrentForecast from "../../UI-components/CurrentForecast"
import classNames from "classnames"
import Loader from "../../UI-components/Loader"
import SearchInput from "../../UI-components/SearchInput"
import SearchResultsList from "../../UI-components/SearchResultList"
import DataVisualHome from "../../UI-components/DataVisualizationHome"

const HomePage = () => {
  const searchInput = useRef<HTMLInputElement | null>(null)
  const toast = useRef<Toast | null>(null)
  const [isSearchResult, setIsSearchResult] = useState<boolean>(false)
  const [fiveDayTlvForecast, setFiveDayTlvForecast] = useState<Array<any>>([])
  const [currentForecast, setCurrentForecast] = useState<any>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isFetched, setIsFetched] = useState<boolean>(false)
  
  const [currentCountryName, setCountryName] = useState<string>("")

  const dispatch = useAppDispatch()

  const searchSchema = z.object({
    text: z.string().min(1),
  })

  const autoCompleteResults = useAppSelector(
    (state) => state.weather.autoCompleteResults,
  )
  const currentLocationResults = useAppSelector(
    (state) => state.weather.currentForecast,
  )
  const currenGeoLocationResults = useAppSelector(
    (state) => state.weather.geoForecast,
  )
  const currentLocationFiveDayResults = useAppSelector(
    (state) => state.weather.fiveDayForecast,
  )
  const theme = localStorage.getItem("theme")
  console.log(currenGeoLocationResults, currentForecast, "daslkjdjsahdjsa")


  const fetchTlvDataHandler = async () => {
    try {
      const telAvivData = await fetchTelAvivData()
      setFiveDayTlvForecast(telAvivData.fiveDayTlvForecast)
      setCurrentForecast(telAvivData.currentTlvForecast)
      setIsFetched(true)
      setIsLoading(true)
    } catch (error) {
      setIsFetched(false)
      setIsLoading(false)

      console.error("Data fetch failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchGeoLocationDataHandler = async (location:any) => {

    try {
      const response:any = await dispatch(
        fetchCurrentForecastWithGeoLocation({ lat: location.coords.latitude, lang: location.coords.longitude }),
      )  
      setIsFetched(true)
      setIsLoading(true)
      setFiveDayTlvForecast(response?.payload?.fiveDayGeoForecast)
      setCurrentForecast(response?.payload?.currentGeoForecast)
      setCountryName(response?.payload?.geoLocation.LocalizedName)
      console.log(response, "GeoLocation response");
      console.log(currenGeoLocationResults, " geogeo")
    } catch (error) {
      setIsFetched(false)
      setIsLoading(false)
      console.error(
        "Fetching current forecast with geo-location failed:",
        error,
      )
    }finally{
      setIsLoading(false)

    }
  }
  

  const successHandler = async (location: any) => {
    console.log(location)
    fetchGeoLocationDataHandler(location)
   
  
  
  }
  const errorHandler = (error: any) => {
    console.log(error)
    fetchTlvDataHandler()
    
  }

  useEffect(() => {
    const geoLocation = navigator.geolocation.getCurrentPosition(
      successHandler,
      errorHandler,

    )

   
  }, [])

  

  const handleSelectCountry = async (result: any) => {
    try {
      setCountryName(result.LocalizedName)

      const response = await dispatch(fetchFiveDayForecast(result?.Key))
      const response2 = await dispatch(fetchCurrentForecast(result?.Key))
      setIsLoading(true)
    } catch (error) {
      console.log(error)
      setIsLoading(false)

    } finally {
      setIsSearchResult(false)
      setIsLoading(false)

    }
  }
  const handleSearch = async () => {
    if (
      !searchInput.current?.value ||
      searchInput.current?.value.trim() === ""
    ) {
      return
    }
    try {
      setIsLoading(true)

      // Validate using zod schema
      searchSchema.parse({ text: searchInput.current?.value })

      const response = await dispatch(
        searchAutoComplete(searchInput.current.value),
      )

      if (searchAutoComplete.fulfilled.match(response)) {
        setIsSearchResult(true)
        searchInput.current.value = ""
        console.log(response, " searchInput.current.value = ")
        if (response.payload.length) {
          toast.current?.show({
            severity: "warn",
            summary: "Nothing found",
            detail: "Search something else nothing found.",
          })
        }
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Search failed",
          detail: "Search failed. Please try again.",
        })
        console.error("Search failed:", response.payload)
      }
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Search failed",
        detail: "Search failed. Please try again.",
      })
      setIsSearchResult(false)

      console.error("Search failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className={classnames({
        "container -mx-6 md:mx-auto lg:mx-auto xl:mx-auto  max-h-screen p-4": true,
      })}
    >
      <Toast ref={toast} />
      {isLoading && <Loader />}

      <div
        className={classnames({
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4": true,
        })}
      >
        <div className="col-span-1 md:col-span-2">
          <div
            className={classNames({
              "rounded-2xl shadow": true,
              " bg-gray-800": theme === "dark",
              " bg-white": theme === "light",
            })}
          >
            <div
              className={classNames({
                "flex min-w-[355px] rounded-2xl ml-1 justify-center items-center p-4": true,
                "bg-gray-700": theme === "dark",
                "bg-white": theme === "light",
              })}
            >
              <SearchInput handleSearch={handleSearch} referral={searchInput} />
            </div>

            {isSearchResult && (
              <div className="">
                <SearchResultsList
                  autoCompleteResults={autoCompleteResults}
                  handleSelectCountry={handleSelectCountry}
                  theme={theme}
                />
              </div>
            )}
          </div>
        </div>

        {isFetched && (
          <div className="h-fit   col-span-1 ml-2">
            <CurrentForecast
            isLoading={isLoading}
              header={
                currentCountryName !== "" ? currentCountryName : "Tel Aviv"
              }
              currentForecast={
                currentLocationResults
                  ? currentLocationResults[0]
                  : currentForecast[0] 
              }
            />
            <br />
            <DataVisualHome
              forecasts={
                currentLocationFiveDayResults
                  ? currentLocationFiveDayResults
                  : fiveDayTlvForecast
              }
            />
          </div>
        )}

        {isFetched && (
          <div className="col-span-1 mt-10 md:col-span-2 lg:col-span-3">
            <ForecastList

              forecasts={
                currentLocationFiveDayResults
                  ? currentLocationFiveDayResults
                  : fiveDayTlvForecast
              }
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
