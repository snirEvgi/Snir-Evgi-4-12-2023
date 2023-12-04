import { useEffect, useRef, useState } from "react"
import { IoSearch } from "react-icons/io5"
import { Toast } from "primereact/toast"
import { z } from "zod"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { useNavigate } from "react-router-dom"
import { searchAutoComplete } from "./weatherSlice"
import { fetchTelAvivData } from "./homepageAPI"
import ForecastList from "../../UI-components/ForecastList"
import CurrentForecast from "../../UI-components/CurrentForecast"

const HomePage = () => {
  const searchInput = useRef<HTMLInputElement>(null)
  const toast = useRef<Toast | null>(null)
  const [countryData, setCountryData] = useState<Array<any>>([])
  const [selectedCountryData, setSelectedCountryData] = useState<any>({})
  const [fiveDayTlvForecast, setFiveDayTlvForecast] = useState<Array<any>>([]);
  const [currentTlvForecast, setCurrentTlvForecast] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isFetched, setIsFetched] = useState<boolean>(false)
  
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const searchSchema = z.object({
    text: z.string().min(1),
  })

useEffect( ()=>{

    const fetchTlvDataHandler = async () => {
        try {
          const telAvivData = await fetchTelAvivData();
          setFiveDayTlvForecast(telAvivData.fiveDayTlvForecast);
          setCurrentTlvForecast(telAvivData.currentTlvForecast);
          setIsFetched(true)
        } catch (error) {
          setIsFetched(false)

          console.error('Data fetch failed:', error);
        }
      };
  
      fetchTlvDataHandler();

},[])


  // selector to get search results from Redux store
  const autoCompleteResults = useAppSelector(
    (state) => state.weather.autoCompleteResults,
  )
  const currentLocationResults = useAppSelector(
    (state) => state.weather.currentForecast,
  )
  const currentLocationFiveDayResults = useAppSelector(
    (state) => state.weather.fiveDayForecast,
  )

  const handleSelectCountry = (result:any) => {


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

      // If validation passes, dispatch the searchAutoComplete action
      const response = await dispatch(
        searchAutoComplete(searchInput.current?.value),
      )
    

      if (searchAutoComplete.fulfilled.match(response)) {
        // navigate("/homepage")
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Autocomplete search failed",
          detail: "Autocomplete search failed. Please try again.",
        })
        console.error("Autocomplete search failed:", response.payload)
      }
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Autocomplete search failed",
        detail: "Autocomplete search failed. Please try again.",
      })
      console.error("Autocomplete search failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
  <Toast ref={toast} />

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div className="col-span-1 md:col-span-2">
      <div className="border border-gray-300 rounded-lg shadow">
        <div className="flex justify-center items-center p-4">
          <div className="flex w-full">
            <input
              ref={searchInput}
              type="text"
              className="flex-grow h-12 pr-8 pl-5 rounded-l-lg focus:shadow-outline"
              placeholder="Search anything..."
            />
            <div
              className="flex items-center justify-center border-l cursor-pointer px-4 bg-gray-200 rounded-r-lg"
              onClick={handleSearch}
            >
              <IoSearch className="text-gray-600" />
            </div>
          </div>
        </div>

        {autoCompleteResults && (
          <div className="max-h-32 overflow-auto">
            <ul className="bg-white divide-y divide-gray-200">
              {autoCompleteResults.map((result) => (
                <li
                  onClick={handleSelectCountry}
                  key={result.Key}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
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
      <div className="col-span-1">
        <CurrentForecast currentForecast={currentTlvForecast[0]} />
      </div>
    )}

    {isFetched && (
      <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <ForecastList forecasts={fiveDayTlvForecast} />
      </div>
    )}
  </div>
</div>

  )
}

export default HomePage
