import axios from "axios"
import { apiKey } from "./weatherSlice"


export async function fetchTelAvivData() {
  const key = "215854"
    const basedLocationKeySearchFiveDayForecast = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${apiKey}`
    const basedLocationKeySearchCurrentForecast = `https://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${apiKey}`
  try {
    const result1 = await axios.get(basedLocationKeySearchCurrentForecast)
    const result2 = await axios.get(basedLocationKeySearchFiveDayForecast)
    const data = {fiveDayTlvForecast: result2.data, currentTlvForecast:result1.data ,key}
    
    return data
  } catch (error) {
    throw error
  }
}

