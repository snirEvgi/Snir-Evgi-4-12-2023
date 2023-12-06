import axios from "axios"

const locationSearch = "http://dataservice.accuweather.com/locations/v1/cities/search?apikey=ICfOrVGI3ofdnGODMlLrRMwyPbISOCdO&q=Los%20Angeles"
const apiKey3 = "ICfOrVGI3ofdnGODMlLrRMwyPbISOCdO"
const apiKey2 = "XqAwKjl5vHX6rEFkdbfLq7zj9yHz7o4R"
const apiKey = "AgSwRsJttx2l9xFP9UVZ1M9l3VSkfR5I"//most relevant
export async function fetchTelAvivData() {
    const basedLocationKeySearchFiveDayForecast = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/215854?apikey=${apiKey}`
    const basedLocationKeySearchCurrentForecast = `http://dataservice.accuweather.com/currentconditions/v1/215854?apikey=${apiKey}`
  try {
    const result1 = await axios.get(basedLocationKeySearchCurrentForecast)
    const result2 = await axios.get(basedLocationKeySearchFiveDayForecast)
    const data = {fiveDayTlvForecast: result2.data, currentTlvForecast:result1.data}
    return data
  } catch (error) {
    console.error("data fetch failed:", error)
    throw error
  }
}
