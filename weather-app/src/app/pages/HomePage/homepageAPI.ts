import axios from "axios"

const locationSearch = "http://dataservice.accuweather.com/locations/v1/cities/search?apikey=ICfOrVGI3ofdnGODMlLrRMwyPbISOCdO&q=Los%20Angeles"
// const searchAutoCompleteURL = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=ICfOrVGI3ofdnGODMlLrRMwyPbISOCdO&q=${searchValue}`
export async function fetchTelAvivData() {
    const basedLocationKeySearchFiveDayForecast = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/215854?apikey=ICfOrVGI3ofdnGODMlLrRMwyPbISOCdO"
    const basedLocationKeySearchCurrentForecast = "http://dataservice.accuweather.com/currentconditions/v1/215854?apikey=ICfOrVGI3ofdnGODMlLrRMwyPbISOCdO"
  try {
    const result1 = await axios.get(basedLocationKeySearchCurrentForecast)
    const result2 = await axios.get(basedLocationKeySearchFiveDayForecast)
    console.log(result1,"asdasd",result2);
    const data = {fiveDayTlvForecast: result2.data, currentTlvForecast:result1.data}
    return data
  } catch (error) {
    console.error("data fetch failed:", error)
    throw error
  }
}
