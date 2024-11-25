import React, { useState, useEffect } from "react";

import {
  CountryList,
  EmptyState,
  FilterDropdown,
  SearchBar,
  SortDropdown,
} from "../components";
import type { Country } from "../shared";
import { fetchWeatherWithTemperature } from "../utils/api";

export const HomePage = ({ countries }: { countries: Country[] }) => {
  const [enrichedCountries, setEnrichedCountries] = useState<
    (Country & { temperature?: number })[]
  >([]);
  const [filteredCountries, setFilteredCountries] = useState<
    (Country & { temperature?: number })[]
  >([]);
  const [query, setQuery] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAllTemperatures = async () => {
      setIsLoading(true);
      const updatedCountries = await Promise.all(
        countries.map(async (country) => {
          const temperature = await fetchWeatherWithTemperature(
            country.capital || ""
          );
          return {
            ...country,
            temperature: temperature ?? undefined,
          };
        })
      );
      setEnrichedCountries(updatedCountries);
      setFilteredCountries(updatedCountries);
      setIsLoading(false);
    };

    fetchAllTemperatures();
  }, [countries]);

  useEffect(() => {
    let results = [...enrichedCountries];

    if (query) {
      results = results.filter((country) =>
        country.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (selectedRegion) {
      results = results.filter(
        (country) => country.continent?.name === selectedRegion
      );
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
  }, [query, selectedRegion, sortKey, sortDirection, enrichedCountries]);

  const handleSearch = (query: string) => {
    setQuery(query);
  };

  const handleFilter = (region: string) => {
    setSelectedRegion(region || null);
  };

  const handleSort = (key: string, direction: "asc" | "desc") => {
    setSortKey(key);
    setSortDirection(direction);
  };

  return (
    <>
      <div className="filters">
        <SearchBar onSearch={handleSearch} />
        <div className="filters">
          <FilterDropdown
            options={["Asia", "Europe", "Africa", "Oceania", "America"]}
            onFilter={handleFilter}
            label="Filter by Region"
          />
          <SortDropdown
            options={[
              { label: "Name (A-Z)", value: "name-asc" },
              { label: "Name (Z-A)", value: "name-desc" },
              { label: "Temperature (Low-High)", value: "temperature-asc" },
              { label: "Temperature (High-Low)", value: "temperature-desc" },
            ]}
            onSort={handleSort}
            label="Sort by:"
          />
        </div>
      </div>
      {filteredCountries.length === 0 && !isLoading ? (
        <EmptyState message="No results found. Try adjusting your search, filters, or sorting." />
      ) : (
        <CountryList countries={filteredCountries} isLoading={isLoading} />
      )}
    </>
  );
};
