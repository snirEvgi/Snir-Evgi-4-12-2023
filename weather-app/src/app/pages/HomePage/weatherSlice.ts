import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"

const apiKey2 = "ICfOrVGI3ofdnGODMlLrRMwyPbISOCdO"
const apiKey3= "XqAwKjl5vHX6rEFkdbfLq7zj9yHz7o4R"
const apiKey= "AgSwRsJttx2l9xFP9UVZ1M9l3VSkfR5I"

interface IAutoCompleteResult {
  autoCompleteResults: any[] | null
  loading: boolean
  error: string | undefined
}

interface IForecastResult {
  fiveDayForecast: any[] | null
  currentForecast: any[] | null
}

const initialState: IAutoCompleteResult & IForecastResult = {
  autoCompleteResults: null,
  loading: false,
  error: undefined,
  fiveDayForecast: null,
  currentForecast: null,
}

export const searchAutoComplete = createAsyncThunk(
  "weather/searchAutoComplete",
  async (searchValue: string) => {
    const searchAutoCompleteURL = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${searchValue}`
    try {
      const result = await axios.get(searchAutoCompleteURL)
      return result.data
    } catch (error) {
      console.error("Autocomplete search failed:", error)
      throw error
    }
  },
)

export const fetchFiveDayForecast = createAsyncThunk(
  "weather/fetchFiveDayForecast",
  async (locationKey: string) => {
    const fiveDayForecastURL = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}`
    try {
      const result = await axios.get(fiveDayForecastURL)
      return result.data
    } catch (error) {
      console.error("Fetching five-day forecast failed:", error)
      throw error
    }
  },
)

export const fetchCurrentForecast = createAsyncThunk(
  "weather/fetchCurrentForecast",
  async (locationKey: string) => {
    const currentForecastURL = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`
    try {
      const result = await axios.get(currentForecastURL)
      return result.data
    } catch (error) {
      console.error("Fetching current forecast failed:", error)
      throw error
    }
  },
)

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchAutoComplete.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(searchAutoComplete.fulfilled, (state, action:PayloadAction<Array<any>>) => {
        state.loading = false
        state.autoCompleteResults = action.payload
      })
      .addCase(searchAutoComplete.rejected, (state, action) => {
        state.loading = false
        state.error = (action.error as Error | undefined)?.message
      })
      .addCase(fetchFiveDayForecast.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(fetchFiveDayForecast.fulfilled, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.fiveDayForecast = action.payload
      })
      .addCase(fetchFiveDayForecast.rejected, (state, action) => {
        state.loading = false
        state.error = (action.error as Error | undefined)?.message
      })
      .addCase(fetchCurrentForecast.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(fetchCurrentForecast.fulfilled, (state, action:PayloadAction<any>) => {
        state.loading = false;
        state.currentForecast = action.payload
      })
      .addCase(fetchCurrentForecast.rejected, (state, action) => {
        state.loading = false
        state.error = (action.error as Error | undefined)?.message
      })
  },
})

export default weatherSlice.reducer
