import axios from "axios"
import { apiKey } from "./weatherSlice"


export async function fetchTelAvivData() {
    const basedLocationKeySearchFiveDayForecast = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/215854?apikey=${apiKey}`
    const basedLocationKeySearchCurrentForecast = `https://dataservice.accuweather.com/currentconditions/v1/215854?apikey=${apiKey}`
  try {
    const result1 = await axios.get(basedLocationKeySearchCurrentForecast)
    const result2 = await axios.get(basedLocationKeySearchFiveDayForecast)
    const data = {fiveDayTlvForecast: result2.data, currentTlvForecast:result1.data}
    
    return data
  } catch (error) {
    throw error
  }
}

