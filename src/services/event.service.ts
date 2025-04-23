import { $api, apiConfig } from "../constants/api";

class EventsService {
  getEvents(page: string) {
    return $api(apiConfig.Events + page);
  }

  postEvent() {
    return $api(apiConfig.Events);
  }
}

export default new EventsService();
