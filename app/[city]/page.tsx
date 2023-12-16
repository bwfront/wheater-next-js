"use client";

import { useEffect, useState } from "react";
import { dresden } from "./json";
import { balo } from "../fonts";

const TOKEN = "52UCMESB68L6K8R7T47QTU4JD";

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

  const wheater: WeatherData = {
    info: {
      resolvedAddress: res.resolvedAddress,
      timezone: res.timezone,
      datetime: res.currentConditions.datetime,
      description: res.description,
    },
    current: {
      temp: ((res.currentConditions.temp - 32) * 5) / 9,
      precip: res.currentConditions.precip,
      windspeed: res.currentConditions.windspeed,
      sunrise: res.currentConditions.sunrise,
      sunset: res.currentConditions.sunset,
      humidity: res.currentConditions.humidity,
      cloudcover: res.currentConditions.cloudcover,
      moonphase: res.currentConditions.moonphase,
    },
  };

  return wheater;
}

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
      <div className="flex gap-5 grow">
        <div className="bg-blue-100 p-10 rounded-2xl flex font-bold">
          <div className="text-6xl flex items-start">
            {Math.round(wheaterData.current.temp)}{" "}
            <div className="text-5xl">°</div>
          </div>
        </div>
        <div className="bg-blue-100 p-10 rounded-2xl grow flex justify-center uppercase font-bold">
          {/*Cloud Cover */}
          <div className="text-6xl flex items-start">
            {cloudCoverReturn(
              wheaterData.current.cloudcover,
              wheaterData.current.precip
            )}
          </div>
        </div>
        <div className="bg-blue-100 p-10 rounded-2xl grow flex justify-center font-bold">
          {/*Rain */}
          <div className="text-6xl flex items-start">
            🌧️ {wheaterData.current.precip}%
          </div>
        </div>
        <div className="bg-blue-100 p-10 rounded-2xl grow flex justify-center font-bold">
          {/*Wind */}
          <div className="text-6xl flex items-start">
            {wheaterData.current.windspeed}
          </div>
        </div>
        <div className="bg-blue-100 p-10 rounded-2xl flex font-bold">
          {/*MoonPhase */}
          <div className="text-6xl flex items-start">
            {moonPhaseReturn(wheaterData.current.moonphase)}
          </div>
        </div>
      </div>
    </div>
  );
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
    return "🌤️ Mostly Sunny";
  } else if (cloudCoverPerc <= 50) {
    return "⛅ Partly Cloudy";
  } else if (cloudCoverPerc <= 70) {
    return "🌥️  Mostly Cloudy";
  } else if (cloudCoverPerc <= 100) {
    return "☁️ Cloudy";
  }
}
