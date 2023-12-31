import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { IAutoCompleteResult, IForecastResult } from "../../models"

export const apiKey = "9qrvieMrQl23ieBw1AAmjW9vLTxeunvF"
export const apiKey1 = "ICfOrVGI3ofdnGODMlLrRMwyPbISOCdO"
export const apiKey2 = "XqAwKjl5vHX6rEFkdbfLq7zj9yHz7o4R"
export const apiKey3 = "AgSwRsJttx2l9xFP9UVZ1M9l3VSkfR5I"

const initialState: IAutoCompleteResult & IForecastResult = {
  autoCompleteResults: null,
  loading: false,
  error: undefined,
  fiveDayForecast: null,
  currentForecast: null,
  geoForecast: null,
}

export const searchAutoComplete = createAsyncThunk(
  "weather/searchAutoComplete",
  async (searchValue: string) => {
    const searchAutoCompleteURL = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${searchValue}`
    try {
      const result = await axios.get(searchAutoCompleteURL)
      return result.data
    } catch (error) {
      throw error
    }
  },
)

export const fetchFiveDayForecast = createAsyncThunk(
  "weather/fetchFiveDayForecast",
  async (locationKey: string) => {
    const fiveDayForecastURL = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}`
    try {
      const result = await axios.get(fiveDayForecastURL)
      return result.data
    } catch (error) {
      throw error
    }
  },
)

export const fetchCurrentForecast = createAsyncThunk(
  "weather/fetchCurrentForecast",
  async (locationKey: string) => {
    const currentForecastURL = `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`
    try {
      const result = await axios.get(currentForecastURL)
      const data = result.data
      return result.data
    } catch (error) {
      throw error
    }
  },
)

export const fetchCurrentForecastWithGeoLocation = createAsyncThunk(
  "weather/geoLocation",
  async ({ lat, lang }: any) => {
    const geoSearch = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat},${lang}`

    try {
      const result = await axios.get(geoSearch)

      const key = result.data.Key
      const currentForecastURL = `https://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${apiKey}`
      const result2 = await axios.get(currentForecastURL)
      const basedLocationKeySearchFiveDayForecast = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${apiKey}`
      const result3 = await axios.get(basedLocationKeySearchFiveDayForecast)
      return {
        geoLocation: result.data,
        fiveDayGeoForecast: result3.data,
        currentGeoForecast: result2.data,
      }
    } catch (error) {
      throw error
    }
  },
)

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchAutoComplete.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(
        searchAutoComplete.fulfilled,
        (state, action: PayloadAction<Array<any>>) => {
          state.loading = false
          state.autoCompleteResults = action.payload
        },
      )
      .addCase(searchAutoComplete.rejected, (state, action) => {
        state.loading = false
        state.error = (action.error as Error | undefined)?.message
      })
      .addCase(fetchFiveDayForecast.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(
        fetchFiveDayForecast.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false
          state.fiveDayForecast = action.payload
        },
      )
      .addCase(fetchFiveDayForecast.rejected, (state, action) => {
        state.loading = false
        state.error = (action.error as Error | undefined)?.message
      })
      .addCase(fetchCurrentForecast.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(
        fetchCurrentForecast.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false
          state.currentForecast = action.payload
        },
      )
      .addCase(fetchCurrentForecast.rejected, (state, action) => {
        state.loading = false
        state.error = (action.error as Error | undefined)?.message
      })
      .addCase(
        fetchCurrentForecastWithGeoLocation.fulfilled,
        (state, action) => {
          state.loading = false
          state.geoForecast = action.payload
        }, 
      )
      .addCase(
        fetchCurrentForecastWithGeoLocation.rejected,
        (state, action) => {
          state.loading = false
          state.error = (action.error as Error | undefined)?.message
        },
      )
      .addCase(fetchCurrentForecastWithGeoLocation.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
  },
})

export default weatherSlice.reducer
