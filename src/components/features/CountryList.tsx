import React, { useState } from "react";

import { CountryPaginate } from "../controls";
import { CountryCardSkeleton, EmptyState } from "../placeholders";

import { CountryCard } from "./CountryCard";

import type { Country } from "@/shared";

const ITEMS_PER_PAGE = 12;

type CountryListProps = {
  countries: Country[];
  isLoading: boolean;
};

export const CountryList: React.FC<CountryListProps> = ({
  countries,
  isLoading,
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentCountries = countries.slice(offset, offset + ITEMS_PER_PAGE);

  if (isLoading) {
    return (
      <div className="countries-grid">
        {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
          <CountryCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <>
      {countries.length === 0 ? (
        <EmptyState message="No countries found. Try adjusting your search or filters." />
      ) : (
        <>
          <CountryPaginate
            pageCount={Math.ceil(countries.length / ITEMS_PER_PAGE)}
            onPageChange={handlePageClick}
          />
          <div className="countries-grid">
            {currentCountries.map((country) => (
              <CountryCard
                key={country.code}
                code={country.code}
                name={country.name}
                capital={country.capital || "No capital available"}
                continent={country.continent?.name || "Unknown"}
                flag={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
              />
            ))}
          </div>
          <CountryPaginate
            pageCount={Math.ceil(countries.length / ITEMS_PER_PAGE)}
            onPageChange={handlePageClick}
          />
        </>
      )}
    </>
  );
};
