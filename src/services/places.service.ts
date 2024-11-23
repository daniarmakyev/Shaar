import { $api, apiConfig } from "../constants/api";
import { IPlace, IPlacesParams, ISimpleData } from "../types/api.types";

class PlacesService {
  getCategories() {
    return $api<ISimpleData[]>(apiConfig.Categories);
  }
  getAll(params?: Partial<IPlacesParams>) {
    return $api<IPlace[]>(apiConfig.Places, { params });
  }
}

export default new PlacesService();
