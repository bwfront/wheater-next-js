"use client";

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
//ASYNC
function wheaterData(location: string) {
  const data = dresden();
  //const data = await getData(location)
  console.log(data);

  const wheaterData = {
    info: {
      resolvedAddress: data.resolvedAddress,
      timezone: data.timezone,
      datetime: data.currentConditions.datetime,
      description: data.description,
    },
    current: {
      windspeed: data.currentConditions.windspeed,
      temp: data.currentConditions.temp,
      sunrise: data.currentConditions.sunrise,
      sunset: data.currentConditions.sunset,
      humidity: data.currentConditions.humidity,
      cloudcover: data.currentConditions.cloudcover,
    },
  };
  return wheaterData;
}

export default function Page({ params }: { params: { city: string } }) {
  const data = wheaterData(params.city);
  console.log("awda: ", data);

  return (
    <>
      <div className="font-extrabold text-lg">Info:</div>
      <div>Location: {data.info.resolvedAddress}</div>
      <div>Timezone: {data.info.timezone}</div>
      <div>Date Time: {data.info.datetime}</div>
      <div>My Post: {params.city}</div>
      <div>My Post: {params.city}</div>
      <div>My Post: {params.city}</div>
      <div>My Post: {params.city}</div>
      <div>My Post: {params.city}</div>
    </>
  );
}
