import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import weatherImage from "../../assets/images/weather.png";

// @ts-ignore
import "swiper/css";
import excelent from "../../assets/images/icons/excelent.png";
import nice from "../../assets/images/icons/nice.png";
import regular from "../../assets/images/icons/regular.png";
import sad from "../../assets/images/icons/sad.png";
import angry from "../../assets/images/icons/angry.png";

interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
}

interface AirQualityData {
  aqi: number;
  level: string;
}

const WeatherAndAirQuality: FC = () => {
  const [airQualityIndex, setAirQualityIndex] = useState<number | null>(null);
  const [temperature, setTemperature] = useState<number | null>(null);

  const bishkekCoordinates = { lat: 42.840079, lon: 74.601139 };

  useEffect(() => {
    const fetchAirQuality = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/air/quality?lat=${bishkekCoordinates.lat}&lon=${bishkekCoordinates.lon}`
        );
        setAirQualityIndex(response.data.air_quality_index);
      } catch (error) {
        console.error("Error fetching air quality data:", error);
      }
    };

    const fetchTemperature = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/weather?lat=${bishkekCoordinates.lat}&lon=${bishkekCoordinates.lon}`
        );
        setTemperature(response.data.temperature);
      } catch (error) {
        console.error("Error fetching temperature data:", error);
      }
    };

    fetchAirQuality();
    fetchTemperature();
  }, []);

  const getAirQualityIcon = () => {
    if (airQualityIndex === null) return null;
    if (airQualityIndex <= 50) return excelent;
    if (airQualityIndex <= 100) return nice;
    if (airQualityIndex <= 150) return regular;
    if (airQualityIndex <= 200) return sad;
    return angry;
  };

  return (
    <div className="relative pt-50">
      <div className="container flex gap-3 sm:gap-10 absolute top-2 sm:relative sm:mt-9">
        <div className="flex h-16 relative w-44 sm:w-44 shadow-md rounded-r-2xl">
          <h3
            className="bg-[#55B0FF] text-white py-4 ps-2 text-2xl sm:text-xl font-bold rounded-s-xl rounded-r-[150px] z-[2] text-gray-800"
            style={{
              textShadow:
                "0px 1px 2px 0px #0000001A, 2px 4px 4px 0px #00000017",
            }}
          >
            {temperature !== null ? `${temperature}°C` : "..."}
          </h3>
          <div
            className="absolute h-16 right-0 w-[80%] rounded-r-2xl"
            style={{
              background:
                "linear-gradient(89.83deg, #1A90F7 0.14%, #1572C3 71.56%, #0F5491 99.86%)",
            }}
          >
            <span>
              <img
                src={weatherImage}
                alt=""
                className="-mt-2 ms-2"
              />
            </span>
          </div>
        </div>
        <div className="flex h-16 relative min-w-32 sm:w-44 shadow-md rounded-r-2xl">
          <h3 className=" bg-[#33BC7C] py-4 px-3 text-2xl sm:text-3xl font-bold rounded-s-xl w-[73px] rounded-r-[150px] z-[5] text-white [text-shadow:_10px_10px_50px_#000]">
            {airQualityIndex !== null ? airQualityIndex : "..."}
          </h3>
          <div
            className="absolute h-16 right-0 w-[80%] rounded-r-2xl"
            style={{
              background:
                "linear-gradient(89.99deg, #43BB83 0.01%, #3CA976 17.41%, #2E825A 88.89%, #1E553C 99.99%)",
            }}
          >
            <span>
              <img
                src={getAirQualityIcon() || undefined}
                alt=""
                className="bottom-3 sm:bottom-1 right-2 sm:right-5 absolute w-10 sm:w-14"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherAndAirQuality;
