import { $api, apiConfig } from "../constants/api";

class AirQualityServce {
  getInfo() {
    return $api(apiConfig.AirQuality);
  }
}

export default new AirQualityServce();
