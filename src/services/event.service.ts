import { $api, apiConfig } from "../constants/api";

class EventsService {
  getEvents() {
    return $api(apiConfig.Events);
  }

  postEvent(event : Event) {
    return $api(apiConfig.Events);
  }
}

export default new EventsService();
