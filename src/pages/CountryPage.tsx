import React, { Suspense } from "react";

const CountryDetails = React.lazy(() =>
  import("../components/features/CountryDetails").then((module) => ({
    default: module.CountryDetails,
  }))
);

export const CountryPage = () => {
  return (
    <div className="country-page">
      <Suspense fallback={<p>Loading country details...</p>}>
        <CountryDetails />
      </Suspense>
    </div>
  );
};
