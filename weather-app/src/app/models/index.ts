


export interface CurrentPlaceForecast {
    EpochTime: number;
    LocalizedName?:string;
    CurrentKey?:string;
    HasPrecipitation: boolean;
    IsDayTime: boolean;
    Link: string;
    LocalObservationDateTime: string;
    MobileLink: string;
    PrecipitationType: string | null;
    Temperature: {
      Imperial: {
        Value: number;
        Unit: 'F';
        UnitType: 18;
      };
      Metric: {
        Value: number;
        Unit: 'C';
        UnitType: 17;
      };
    };
    WeatherIcon: number;
    WeatherText: string;
  }


  export  interface DailyForecast {
    Date: string;
    LocalizedName?:string;

    Day: {
      Icon: number;
      IconPhrase: string;
      HasPrecipitation: boolean;
    };
    EpochDate: number;
    Link: string;
    MobileLink: string;
    Night: {
      HasPrecipitation: boolean;
      Icon: number;
      IconPhrase: string;
    };
    Sources: string[];
    Temperature: {
      Maximum: {
        Value: number;
        Unit: string;
        UnitType: number;
      };
      Minimum: {
        Value: number;
        Unit: string;
        UnitType: number;
      };
    };
  }
  export interface IAutoCompleteResult {
    autoCompleteResults: any[] | null
    loading: boolean
    error: string | undefined
  }
  
  export interface IForecastResult {
    fiveDayForecast: Array<DailyForecast> | null
    currentForecast: Array<CurrentPlaceForecast> | null
    geoForecast: {} | null
  }