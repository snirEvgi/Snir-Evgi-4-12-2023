import axios from "axios"


export async function fetchTelAvivData() {
  const apiKey3 = "XqAwKjl5vHX6rEFkdbfLq7zj9yHz7o4R"//done
const apiKey4 = "ICfOrVGI3ofdnGODMlLrRMwyPbISOCdO"//done
const apiKey2= "9qrvieMrQl23ieBw1AAmjW9vLTxeunvF"//done
const apiKey = "AgSwRsJttx2l9xFP9UVZ1M9l3VSkfR5I"
    const basedLocationKeySearchFiveDayForecast = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/215854?apikey=${apiKey}`
    const basedLocationKeySearchCurrentForecast = `https://dataservice.accuweather.com/currentconditions/v1/215854?apikey=${apiKey}`
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

