import React from "react";

import Skeleton from "react-loading-skeleton";

export const CountryCardSkeleton: React.FC = () => {
  return (
    <div className="country-card">
      <Skeleton height={100} width="100%" />
    </div>
  );
};
