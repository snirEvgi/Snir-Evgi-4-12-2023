import  { useState } from 'react';



const ForecastList = (props:{forecasts: Array<any> }) => {
    const [fiveDayForecast, setFiveDayForecast] = useState<Array<any>>((props.forecasts as any)?.DailyForecasts);
  return (
    <div className="p-4">
    <h2 className="text-2xl font-semibold mb-4">Daily Forecasts</h2>
    <div className="flex gap-6 overflow-x-auto py-2">
      {fiveDayForecast.map((forecast:any, index:number) => (
        <div key={index} className="flex-none  w-[20rem] bg-white shadow rounded-lg m-2 p-4">
          <h3 className="font-semibold">{new Date(forecast.Date).toLocaleDateString()}</h3>
          <br />
          <p>
            <strong>Day:</strong> {forecast.Day.IconPhrase}<br />
            <strong>Night:</strong> {forecast.Night.IconPhrase}<br />
            <strong>Max Temp:</strong> {forecast.Temperature.Maximum.Value}°F<br />
            <strong>Min Temp:</strong> {forecast.Temperature.Minimum.Value}°F
          </p>
        </div>
      ))}
    </div>
  </div>
  );
};

export default ForecastList;
