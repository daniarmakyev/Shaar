import { $apiPrivate, apiConfig } from "../constants/api";
import { IPlace, IPlacesParams, Category } from "../types/api.types";

class PlacesService {
  getCategories() {
    return $apiPrivate<Category[]>(apiConfig.Categories);
  }

  getAll(params?: Partial<IPlacesParams>) {
    const finalParams: Record<string, string | number> = {};

    if (params?.categories) {
      finalParams.categories = params.categories.join(",");
    }

    if (params?.rating) {
      finalParams.rating = typeof params.rating === "string" ? parseFloat(params.rating) : params.rating;
    }

    if (params?.price) {
      finalParams.price = params.price;
    }

    return $apiPrivate<IPlace[]>(apiConfig.Places, { params: finalParams });
  }
}


export default new PlacesService();


