
interface CurrentForecastProps {
  currentForecast: any|{}; 
}

const CurrentForecast = ({ currentForecast }:CurrentForecastProps) => {
console.log(currentForecast);

  return (
    <div className="p-4 max-w-sm mx-auto">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg  font-medium text-gray-900">Current Forecast</h3>
          <div className="mt-5">
            <p className="text-sm text-gray-500">
              <strong>Date:</strong> {new Date(currentForecast.LocalObservationDateTime).toLocaleString()}<br />
              <strong>Temp (F):</strong> {currentForecast.Temperature.Imperial.Value}°F<br />
              <strong>Temp (C):</strong> {currentForecast.Temperature.Metric.Value}°C<br />
              <strong>Weather:</strong> {currentForecast.WeatherText}<br />
            </p>
          </div>
        </div>
      </div>
    </div>
  
  );
};

export default CurrentForecast;
