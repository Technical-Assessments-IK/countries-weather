import React, { useState, useEffect } from "react";

import {
  CountryList,
  EmptyState,
  FilterDropdown,
  SearchBar,
  SortDropdown,
} from "../components";
import type { Country } from "@/shared";
import { fetchWeatherWithTemperature } from "../utils/api";
import { Container } from "@mui/material";
import { useFilteredCountries } from "../hooks/useFilteredCountries";

export const HomePage = ({ countries }: { countries: Country[] }) => {
  const [enrichedCountries, setEnrichedCountries] = useState<
    (Country & { temperature?: number })[]
  >([]);
  const [query, setQuery] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const filteredCountries = useFilteredCountries(
    enrichedCountries,
    query,
    selectedRegion,
    sortKey,
    sortDirection
  );

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
      setIsLoading(false);
    };

    fetchAllTemperatures();
  }, [countries]);

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
    <Container className="home-page">
      <div className="filters-wrap">
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
    </Container>
  );
};
