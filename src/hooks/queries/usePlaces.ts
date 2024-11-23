import { useQuery } from "@tanstack/react-query";
import placesService from "../../services/places.service";
import { queryKeys } from "../../constants/api";
import { IPlacesParams } from "../../types/api.types";

export const usePlaces = (params?: IPlacesParams) =>
  useQuery({
    queryKey: [queryKeys.Places],
    queryFn: () => placesService.getAll(params),
    select: ({ data }) => data,
  });
