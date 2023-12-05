import { useEffect, useRef, useState } from "react"
import { IoSearch } from "react-icons/io5"
import { Toast } from "primereact/toast"
import { z } from "zod"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { useNavigate } from "react-router-dom"
import {
  fetchCurrentForecast,
  fetchFiveDayForecast,
  searchAutoComplete,
} from "./weatherSlice"
import { fetchTelAvivData } from "./homepageAPI"
import classnames from "classnames"

import ForecastList from "../../UI-components/ForecastList"
import CurrentForecast from "../../UI-components/CurrentForecast"
import DataVisual from "../../UI-components/DataVisualisation"
import classNames from "classnames"
import Loader from "../../UI-components/Loader"

const HomePage = () => {
  const searchInput = useRef<HTMLInputElement>(null)
  const toast = useRef<Toast | null>(null)
  const [isSearchResult, setIsSearchResult] = useState<boolean>(false)
  const [fiveDayTlvForecast, setFiveDayTlvForecast] = useState<Array<any>>([])
  const [currentTlvForecast, setCurrentTlvForecast] = useState<any>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isFetched, setIsFetched] = useState<boolean>(false)
  const [currentCountryName, setCountryName] = useState<string>("")

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const searchSchema = z.object({
    text: z.string().min(1),
  })

  useEffect(() => {
    const fetchTlvDataHandler = async () => {
      try {
        const telAvivData = await fetchTelAvivData()
        setFiveDayTlvForecast(telAvivData.fiveDayTlvForecast)
        setCurrentTlvForecast(telAvivData.currentTlvForecast)
        setIsFetched(true)
        setIsSearchResult(true)
      } catch (error) {
        setIsFetched(false)
        setIsSearchResult(false)

        console.error("Data fetch failed:", error)
      }
    }

    fetchTlvDataHandler()
   
  }, [])

  const autoCompleteResults = useAppSelector(
    (state) => state.weather.autoCompleteResults,
  )
  const currentLocationResults = useAppSelector(
    (state) => state.weather.currentForecast,
  )
  const currentLocationFiveDayResults = useAppSelector(
    (state) => state.weather.fiveDayForecast,
  )
  const theme = useAppSelector((state) => state.theme.theme) || "light"

  const handleSelectCountry = async (result: any) => {

  try {
      setCountryName(result.LocalizedName)
      const response = await dispatch(fetchFiveDayForecast(result?.Key))
      const response2 = await dispatch(fetchCurrentForecast(result?.Key))

  } catch (error) {
    console.log(error);
    
  }finally{
    setIsSearchResult(false)

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

      // Validate using Zod schema
      searchSchema.parse({ text: searchInput.current?.value })

      const response = await dispatch(
        searchAutoComplete(searchInput.current?.value),
      )

      if (searchAutoComplete.fulfilled.match(response)) {
        // navigate("/homepage")
      setIsSearchResult(true)

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
        "container mx-auto max-h-screen p-4": true,
      })}
    >
      <Toast ref={toast} />
      {isLoading && <Loader/>}

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
            <div className={classNames({
              "flex  rounded-2xl justify-center items-center p-4":true,
              "bg-gray-700":theme === "dark",
              "bg-white":theme === "light"
          })}>
              <div className="flex w-full">
                <input
                  ref={searchInput}
                  type="text"
                  className={classNames({
                    "flex-grow h-12 pr-8 pl-5 rounded-l-lg focus:shadow-outline focus:outline-none bg-transparent ":
                      true,
                    " bg-gray-800 text-white": theme === "dark",
                    " bg-white text-black": theme === "light",
                  })}
                  placeholder="Search Any Place..."
                />
                <div
                  className="flex items-center justify-center border-l cursor-pointer px-4 bg-gray-200 dark:bg-gray-600 rounded-r-lg"
                  onClick={handleSearch}
                >
                  <IoSearch className="text-gray-600 dark:text-white" />
                </div>
              </div>
            </div>

            {isSearchResult && (
              <div className="max-h-40 overflow-auto">
                <ul
                  className={classNames({
                    "  divide-y rounded-xl": true,
                    "bg-gray-800 divide-gray-700 text-white": theme === "dark",
                    "bg-white divide-gray-200 text-black": theme === "light",
                  })}
                >
                  {autoCompleteResults?.map((result) => (
                    <li
                      onClick={() => handleSelectCountry(result)}
                      key={result.Key}
                      className={classNames({
                        "px-4 py-2 cursor-pointer  ": true,
                        "hover:bg-gray-900 text-white": theme === "black",
                        "hover:bg-gray-100 text-black": theme === "light",
                      })}
                    >
                      {result.LocalizedName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {isFetched && (
          <div className="h-fit col-span-1 ml-2">
            <CurrentForecast
              header={
                currentCountryName !== "" ? currentCountryName : "Tel Aviv"
              }
              currentForecast={
                currentLocationResults
                  ? currentLocationResults[0]
                  : currentTlvForecast[0]
              }
            />
            <br />
            <DataVisual
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
