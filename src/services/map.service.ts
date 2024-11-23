import { $api } from "../constants/api";

class MapService {
  getByText(text: string) {
    return $api(
      `https://nominatim.openstreetmap.org/search?q=${text}&countrycodes=kg&format=json`
    );
  }
}

export default new MapService();
