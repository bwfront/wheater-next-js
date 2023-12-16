interface WeatherInfo {
    resolvedAddress: string;
    timezone: string;
    datetime: string;
    description: string;
  }
  
  interface CurrentWeather {
    temp: number;
    precip: number;
    windspeed: number;
    sunrise: string;
    sunset: string;
    humidity: number;
    cloudcover: number;
    moonphase: number;
  }
  
  interface WeatherData {
    info: WeatherInfo;
    current: CurrentWeather;
  }