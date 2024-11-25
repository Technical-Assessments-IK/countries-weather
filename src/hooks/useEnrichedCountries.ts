import { useState, useEffect } from "react";

import type { Country } from "../shared";
import { fetchWeatherWithTemperature } from "../utils/api";

export const useEnrichedCountries = (countries: Country[]) => {
  const [enrichedCountries, setEnrichedCountries] = useState<(Country & { temperature?: number })[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const enrichCountries = async () => {
      setIsLoading(true);
      const enriched = await Promise.all(
        countries.map(async (country) => {
          const temperature = await fetchWeatherWithTemperature(country.capital || "");
          return { ...country, temperature: temperature ?? undefined };
        })
      );
      setEnrichedCountries(enriched);
      setIsLoading(false);
    };

    enrichCountries();
  }, [countries]);

  return { enrichedCountries, isLoading };
};
