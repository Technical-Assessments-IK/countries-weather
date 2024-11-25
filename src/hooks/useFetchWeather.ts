import { useState, useEffect } from "react";

import { fetchWeather } from "../utils/api";

import type { Weather } from "@/shared";

export const useFetchWeather = (capital: string) => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (capital) {
      fetchWeather(capital)
        .then((data: Weather) => setWeather(data))
        .catch(() => setError("Failed to fetch weather data."));
    } else {
      setError("No capital available.");
    }
  }, [capital]);

  return { weather, error };
};
