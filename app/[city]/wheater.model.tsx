interface WeatherInfo {
    resolvedAddress: string;
    timezone: string;
    datetime: string;
    description: string;
  }
  
  interface CurrentWeather {
    temp: number;
    precip: number;
    windgust: number;
    sunrise: string;
    sunset: string;
    humidity: number;
    cloudcover: number;
    moonphase: number;
  }
  
  interface WeatherData {
    info: WeatherInfo;
    current: CurrentWeather;
    futureDays: FutureDays;
  }

  interface FutureDays {
    [key: string]: FutDay;
  }

  interface FutDay{
    id: number;
    timeEpoch: number;
    description: string;
    temp: number;
    tempmax: number;
    tempmin: number;
    precip: number;
    cloudcover: number;
  }