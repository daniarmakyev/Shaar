import axios from "axios";
import Cookies from "js-cookie";

export const API_URL = import.meta.env.VITE_SERVER_URL;
export const $api = axios.create({ baseURL: API_URL });
export const $apiPrivate = axios.create({ baseURL: API_URL });

export enum apiConfig {
  Register = "/signup",
  Login = "/signin",
  Refresh = "/refresh",
  Categories = "/categories",
  Places = "places",
  AirQuality = "air",
  Weather = "/weather",
  User = "/user",
}

export const queryKeys = {
  Categories: 'categories',
  Places: 'places',
  Ratings: 'ratings',
} as const;

$apiPrivate.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("shaar-access-token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

$apiPrivate.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const { data } = await axios.post<{ accessToken: string }>(
          `${API_URL}${apiConfig.Refresh}`,
          {
            refreshToken: Cookies.get("shaar-refresh-token"),
          }
        );
        localStorage.setItem("shaar-access-token", data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return $apiPrivate.request(originalRequest);
      } catch (error) {
        localStorage.removeItem("shaar-access-token")
        Cookies.remove("shaar-refresh-token")
        console.error(error);
      }
    }
    throw error;
  }
);
