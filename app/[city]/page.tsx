"use client";

import { useEffect, useState } from "react";
import { dresden } from "./json";
import { balo } from "../fonts";

const TOKEN = "52UCMESB68L6K8R7T47QTU4JD";

export default function Page({ params }: { params: { city: string } }) {
  const [wheaterData, setWheaterData] = useState<WeatherData>();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await returnData(params.city);
        setWheaterData(data);
      } catch (error) {
        console.error("Error fetching weather data", error);
      }
    }
    fetchData();
  }, [params.city]);

  if (!wheaterData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-7 flex flex-col gap-5">
      <WheaterInfoTop wheaterData={wheaterData} />
      <CurrentWeather wheaterData={wheaterData} />
      <FutureWheater wheaterData={wheaterData} />
    </div>
  );
}

export async function getData(location: string) {
  console.log("API Req.");

  const res = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=${TOKEN}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function returnData(location: string) {
  //const res = await getData(location);
  const res = dresden();
  console.log(res);
  let futureDays: any = {};

  for (let i = 1; i <= 6; i++) {
    futureDays[`day${i}`] = {
      timeEpoch: res.days[i].datetimeEpoch,
      description: res.days[i].description,
      temp: calcFtoC(res.days[i].temp),
      tempmax: calcFtoC(res.days[i].tempmax),
      tempmin: calcFtoC(res.days[i].tempmin),
      precip: res.days[i].precip,
      cloudcover: res.days[i].cloudcover,
      id: i,
    };
  }

  const wheater: WeatherData = {
    info: {
      resolvedAddress: res.resolvedAddress,
      timezone: res.timezone,
      datetime: res.currentConditions.datetime,
      description: res.description,
    },
    current: {
      temp: calcFtoC(res.currentConditions.temp),
      precip: res.currentConditions.precip,
      windgust: res.currentConditions.windgust,
      sunrise: res.currentConditions.sunrise,
      sunset: res.currentConditions.sunset,
      humidity: res.currentConditions.humidity,
      cloudcover: res.currentConditions.cloudcover,
      moonphase: res.currentConditions.moonphase,
    },
    futureDays: futureDays,
  };
  console.log(wheater);

  return wheater;
}

function calcFtoC(temp: number) {
  return Math.round(((temp - 32) * 5) / 9);
}

function moonPhaseReturn(moonphase: number) {
  if (moonphase >= 0 && moonphase < 0.1) {
    return "🌑";
  } else if (moonphase < 0.25) {
    return "🌒";
  } else if (moonphase < 0.3) {
    return "🌓";
  } else if (moonphase < 0.5) {
    return "🌔";
  } else if (moonphase == 0.5) {
    return "🌕";
  } else if (moonphase < 0.7) {
    return "🌖";
  } else if (moonphase < 0.75) {
    return "🌗";
  } else if (moonphase < 0.9) {
    return "🌘";
  } else {
    return "🌑";
  }
}

function cloudCoverReturn(cloudCoverPerc: number, rainPerc: number) {
  if (rainPerc >= 55) {
    return "🌧️ Rainy";
  }
  if (cloudCoverPerc <= 10) {
    return "☀️ Clear";
  } else if (cloudCoverPerc <= 30) {
    return "🌤️ Sunny"; //Mostly
  } else if (cloudCoverPerc <= 50) {
    return "⛅ Cloudy";  //Partly
  } else if (cloudCoverPerc <= 70) {
    return "🌥️  Cloudy"; //Mostly
  } else if (cloudCoverPerc <= 100) {
    return "☁️ Cloudy";
  }
}

function timeEpochToDayReturn(timeEpoch: number) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(timeEpoch * 1000);
  return days[date.getDay()];
}

function WheaterInfoTop({ wheaterData }: { wheaterData: WeatherData }) {
  return (
    <div className="bg-blue-100 p-10 rounded-2xl">
      <div
        className={`${balo.className} text-5xl font-extrabold text-blue-800 mb-5`}
      >
        <div className="text-base font-medium text-gray-800">
          Status: {wheaterData.info.timezone}{" "}
          {wheaterData.info.datetime.slice(0, 5)} Uhr
        </div>
        {wheaterData.info.resolvedAddress}
      </div>
      <div className="text-lg">{wheaterData.info.description}</div>
    </div>
  );
}

function CurrentWeather({ wheaterData }: { wheaterData: WeatherData }) {
  return (
    <div className="flex gap-5 grow flex-wrap">
      <div className="bg-blue-100 p-10 rounded-2xl flex font-bold">
        <div className="text-6xl flex items-start">
          {wheaterData.current.temp} <div className="text-5xl">°</div>
        </div>
      </div>
      <div className="bg-blue-100 p-10 rounded-2xl flex-shrink-0 grow flex justify-center uppercase font-bold basis-0">
        <div className="text-6xl flex items-start">
          {cloudCoverReturn(
            wheaterData.current.cloudcover,
            wheaterData.current.precip
          )}
        </div>
      </div>
      <div className="bg-blue-100 p-10 rounded-2xl flex flex-shrink-0 justify-center font-bold">
        <div className="text-6xl flex items-start">
          🌧️ {wheaterData.current.precip}%
        </div>
      </div>
      <div className="bg-blue-100 p-10 rounded-2xl flex-shrink-0 grow flex justify-center font-bold basis-0">
        <div className="text-6xl flex items-start">
          💨 {wheaterData.current.windgust} kp/h
        </div>
      </div>
      <div className="bg-blue-100 p-10 rounded-2xl flex font-bold">
        <div className="text-6xl flex items-start">
          {moonPhaseReturn(wheaterData.current.moonphase)}
        </div>
      </div>
    </div>
  );
}

function FutureWheater({ wheaterData }: { wheaterData: WeatherData }) {
  if (!wheaterData || !wheaterData.futureDays) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex gap-5 flex-wrap">
      {Object.keys(wheaterData.futureDays).map((dayKey: string) => {
        const day = wheaterData.futureDays[dayKey];
        return (
          <div
            key={dayKey}
            className="bg-blue-100 p-5 pb-6 rounded-2xl flex grow font-bold flex-col items-center basis-0"
          >
            <div className="text-base font-medium text-gray-800">
              {timeEpochToDayReturn(day.timeEpoch)}
            </div>
            <div className="flex mt-4 gap-5">
              <div className="text-4xl">{day.tempmin}° / {day.tempmax}°</div>
              <div className="text-4xl"> {(cloudCoverReturn(day.cloudcover, day.precip))?.slice(0, 2)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
