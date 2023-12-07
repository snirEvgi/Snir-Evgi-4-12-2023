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
import { fetchTelAvivData } from "./weatherAPI"
import classnames from "classnames"
import ForecastList from "../../UI-components/ForecastList"
import CurrentForecast from "../../UI-components/CurrentForecast"
import classNames from "classnames"
import Loader from "../../UI-components/Loader"
import SearchInput from "../../UI-components/SearchInput"
import SearchResultsList from "../../UI-components/SearchResultList"
import DataVisualHome from "../../UI-components/DataVisualizationHome"
import { CurrentPlaceForecast, DailyForecast } from "../../models"

const HomePage = () => {
  const searchInput = useRef<HTMLInputElement | null>(null)
  const toast = useRef<Toast | null>(null)
  const [isSearchResult, setIsSearchResult] = useState<boolean>(false)
  const [fiveDayTlvForecast, setFiveDayForecast] = useState<
    Array<DailyForecast>
  >([])
  const [currentForecast, setCurrentForecast] = useState<
    Array<CurrentPlaceForecast>
  >([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isFetched, setIsFetched] = useState<boolean>(false)
  const divRef = useRef<null | any>(null)

  const [currentCountryName, setCountryName] = useState<string>("")
  const [currentCountryKey, setCountryKey] = useState<string>("")
  const currentFavorite = JSON.parse(
    localStorage.getItem("currentFavoriteLocation") as any,
  )
  const currentLocation = JSON.parse(localStorage.getItem("currentFavoriteLocation")as any)

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

  const currentLocationFiveDayResults = useAppSelector(
    (state) => state.weather.fiveDayForecast,
  )
  const theme = localStorage.getItem("theme") || "light"

  const fetchTlvDataHandler = async () => {
    try {
      const telAvivData = await fetchTelAvivData()
      setFiveDayForecast(telAvivData.fiveDayTlvForecast)
      setCurrentForecast(telAvivData.currentTlvForecast)
      setCountryKey(telAvivData.key)
      setIsFetched(true)
      setIsLoading(true)
    } catch (error) {
      setIsFetched(false)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }
  const setFavoriteDataHandler = async () => {
    try {
      setCurrentForecast(currentFavorite)
      setCountryName(currentFavorite[0].LocalizedName)

      const response = await dispatch(
        fetchFiveDayForecast(currentFavorite[1] as string),
      )

      setFiveDayForecast(response.payload)
      setIsFetched(true)
      setIsLoading(true)
    } catch (error) {
      setIsFetched(false)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchGeoLocationDataHandler = async (location: GeolocationPosition) => {
    try {
      const response: any = await dispatch(
        fetchCurrentForecastWithGeoLocation({
          lat: location.coords.latitude,
          lang: location.coords.longitude,
        }),
      )
      setIsFetched(true)
      setIsLoading(true)
      setFiveDayForecast(response?.payload?.fiveDayGeoForecast)
      setCurrentForecast(response?.payload?.currentGeoForecast)
      setCountryName(response?.payload?.geoLocation.LocalizedName)
    } catch (error) {
      setIsFetched(false)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  const successHandler = async (location: GeolocationPosition) => {
    if (currentFavorite) {
      await setFavoriteDataHandler()
    } else {
      await fetchGeoLocationDataHandler(location)
    }
  }
  const errorHandler = async (error: GeolocationPositionError) => {
    if (currentFavorite) {
      await setFavoriteDataHandler()
    } else {
      await fetchTlvDataHandler()
    }
  }

  useEffect(() => {
    const geoLocation = navigator.geolocation.getCurrentPosition(
      successHandler,
      errorHandler,
    )
 
  }, [])
  useEffect(() => {
  
    localStorage.removeItem("currentFavoriteLocation")
  }, [])

  const handleSelectCountry = async (place: any) => {
    try {
      setCountryName(place.LocalizedName)
      const response = await dispatch(fetchFiveDayForecast(place?.Key))
      setCountryKey(place?.key)
      const response2 = await dispatch(fetchCurrentForecast(place?.Key))
      setIsLoading(true)
    } catch (error) {
      setIsLoading(false)
    } finally {
      setIsSearchResult(false)
      setIsLoading(false)
    }
  }
  const handleSearch = async (textInputValue: string) => {
    if (!textInputValue || textInputValue.trim() === "") {
      return
    }
    try {
      setIsLoading(true)

      // Validate using zod schema
      searchSchema.parse({ text: textInputValue })

      const response = await dispatch(searchAutoComplete(textInputValue))

      if (searchAutoComplete.fulfilled.match(response)) {
        setIsLoading(false)
        setIsSearchResult(true)
      }
      if (searchAutoComplete.pending.match(response)) {
        setIsLoading(true)
      }
      if (searchAutoComplete.rejected.match(response)) {
        setIsLoading(false)
      }

      if (response.payload.length && response.payload.length < 0) {
        toast.current?.show({
          severity: "warn",
          summary: "Nothing found",
          detail: "Search something else nothing found.",
        })
      } else if (response.payload.length === 0 || !response.payload.length) {
        toast.current?.show({
          severity: "warn",
          summary: "Not Found",
          detail: "Not Found. Please search someplace else.",
        })
      }
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Unexpected issue ",
        detail: "Issue found. Please contact admin.",
      })
      setIsSearchResult(false)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div
      className={classnames({
        "container -mx-6 md:mx-auto lg:mx-auto xl:mx-auto  max-h-screen p-4":
          true,
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
              "rounded-2xl mr-2 p-2 h-fit min-w-fit": true,
            })}
          >
            <div>
              <div
                className={classNames({
                  "flex  rounded-2xl   justify-center items-center p-4": true,
                  "bg-gray-700": theme === "dark",
                  "bg-white": theme === "light",
                })}
              >
                <SearchInput
                  handleSearch={handleSearch}
                  referral={searchInput}
                />
              </div>

              {isSearchResult && (
                <div ref={divRef} className="rounded-2xl mr-2.5 z-10">
                  <SearchResultsList
                    autoCompleteResults={autoCompleteResults}
                    handleSelectCountry={handleSelectCountry}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {isFetched && (
          <div className="h-fit   col-span-1 ml-3">
            <CurrentForecast
              header={
                currentCountryName !== "" ? currentCountryName : "Tel Aviv"
              }
              func={fetchTelAvivData}
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
       <footer className={classNames({"p-4 md:ml-0 lg:ml-0 xl:ml-0 ml-3 ":true,"bg-gray-800 opacity-95 text-white":theme ==="dark","bg-white opacity-70 text-black":theme ==="light"})}>
         <div className={"container mx-auto text-center"}>
            <p className="text-sm">&copy; {new Date().getFullYear()} Weather App</p>
         </div>
      </footer>
    </div>
  )
}

export default HomePage
