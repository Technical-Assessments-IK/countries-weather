import React from "react";
import { CountryPaginate } from "../controls";
import { CountryCardSkeleton, EmptyState } from "../placeholders";
import { CountryCard } from "./CountryCard";
import { usePagination } from "../../hooks";
import { ITEMS_PER_PAGE, type Country } from "../../shared";

type CountryListProps = {
  countries: Country[];
  isLoading: boolean;
};

export const CountryList: React.FC<CountryListProps> = ({
  countries,
  isLoading,
}) => {
  const { paginatedItems, handlePageClick } = usePagination(
    countries,
    ITEMS_PER_PAGE
  );

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
            onPageChange={(event) => handlePageClick(event.selected)}
          />
          <div className="countries-grid">
            {paginatedItems.map((country) => (
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
            onPageChange={(event) => handlePageClick(event.selected)}
          />
        </>
      )}
    </>
  );
};
