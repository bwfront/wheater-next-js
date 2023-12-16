"use client";

import { useEffect, useState } from "react";
import { dresden } from "./json";

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
  
  const wheater: WeatherData = {
    info: {
      resolvedAddress: res.resolvedAddress,
      timezone: res.timezone,
      datetime: res.currentConditions.datetime,
      description: res.description,
    },
    current: {
      temp: res.currentConditions.temp,
      precip: res.currentConditions.precip,
      windspeed: res.currentConditions.windspeed,
      sunrise: res.currentConditions.sunrise,
      sunset: res.currentConditions.sunset,
      humidity: res.currentConditions.humidity,
      cloudcover: res.currentConditions.cloudcover,
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
    <div className="ml-10 mt-10">
      <div className="font-extrabold text-lg">Info:</div>
      <div>Location: {wheaterData.info.resolvedAddress}</div>
      <div>Timezone: {wheaterData.info.timezone}</div>
      <div>Date Time: {wheaterData.info.datetime}</div>
      <div>Descripton: {wheaterData.info.description}</div>

      <div className="font-extrabold text-lg mt-3">Current Wheater:</div>
      <div>Temp: {wheaterData.current.temp}</div>
      <div>Rain: {wheaterData.current.precip}</div>
      <div>Cloud Cover: {wheaterData.current.cloudcover}</div>
      <div>Humidity: {wheaterData.current.humidity}</div>
    </div>
  );
}
