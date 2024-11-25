import { useState, useEffect } from "react";

import type { Country } from "../shared";

export const useFilteredCountries = (
  countries: (Country & { temperature?: number })[],
  query: string,
  selectedRegion: string | null,
  sortKey: string,
  sortDirection: "asc" | "desc"
) => {
  const [filteredCountries, setFilteredCountries] = useState<
    (Country & { temperature?: number })[]
  >([]);

  useEffect(() => {
    let results = [...countries];

    if (query) {
      results = results.filter((country) =>
        country.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (selectedRegion) {
      results = results.filter((country) => {
        const continents = Array.isArray(country.continent)
          ? country.continent
          : country.continent
          ? [country.continent]
          : [];

        return continents.some(
          (c) =>
            typeof c === "string" &&
            c.toLowerCase() === selectedRegion.toLowerCase()
        );
      });
    }

    results.sort((a, b) => {
      if (sortKey === "name") {
        return sortDirection === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }

      if (sortKey === "temperature") {
        return sortDirection === "asc"
          ? (a.temperature || 0) - (b.temperature || 0)
          : (b.temperature || 0) - (a.temperature || 0);
      }

      return 0;
    });

    setFilteredCountries(results);
  }, [countries, query, selectedRegion, sortKey, sortDirection]);

  return filteredCountries;
};
