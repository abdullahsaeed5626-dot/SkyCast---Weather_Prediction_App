import axios from "axios";
import type {
  Coordinates,
  CurrentWeather,
  ForecastResponse,
  LocationResult,
} from "../types/weather";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

const checkApiKey = () => {
  if (!API_KEY) {
    throw new Error("Missing OpenWeather API key. Add it to your .env file.");
  }
};

export const getLocation = async (city: string): Promise<LocationResult> => {
  checkApiKey();

  const response = await api.get<LocationResult[]>("/geo/1.0/direct", {
    params: {
      q: city,
      limit: 1,
      appid: API_KEY,
    },
  });

  if (response.data.length === 0) {
    throw new Error("Location not found. Try another city.");
  }

  return response.data[0];
};

export const getWeatherByCoordinates = async (
  coordinates: Coordinates,
): Promise<CurrentWeather> => {
  checkApiKey();

  const response = await api.get<CurrentWeather>("/data/2.5/weather", {
    params: {
      ...coordinates,
      units: "metric",
      appid: API_KEY,
    },
  });

  return response.data;
};

export const getForecastByCoordinates = async (
  coordinates: Coordinates,
): Promise<ForecastResponse> => {
  checkApiKey();

  const response = await api.get<ForecastResponse>("/data/2.5/forecast", {
    params: {
      ...coordinates,
      units: "metric",
      appid: API_KEY,
    },
  });

  return response.data;
};
