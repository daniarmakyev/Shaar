import { $apiPrivate, apiConfig } from "../constants/api";

class AirAndWeatherServce {
  getWeather() {
    return $apiPrivate(apiConfig.Weather);
  }

  getAir() {
    return $apiPrivate(apiConfig.AirQuality);
  }
}

export default new AirAndWeatherServce();
