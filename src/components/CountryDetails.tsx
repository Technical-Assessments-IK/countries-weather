import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import type { Country } from "../types";
import { GET_COUNTRY_DETAILS } from "../graphql/queries/countries";

type DetailRowProps = {
  label: string;
  value: string | null | undefined;
  loading: boolean;
  skeletonWidth: number;
};

const DetailRow: React.FC<DetailRowProps> = ({ label, value, loading, skeletonWidth }) => (
  <p>
    <strong>{label}:</strong>{' '}
    {loading ? <Skeleton width={skeletonWidth} /> : value || `No ${label.toLowerCase()} available`}
  </p>
);

export const CountryDetails = () => {
  const { code } = useParams<{ code: string }>();
  const { data, loading, error } = useQuery(GET_COUNTRY_DETAILS, {
    variables: { code },
  });

  if (error) return <p>Error: {error.message}</p>;

  const country = data?.country as Country | undefined;

  return (
    <div className="country-details">
      <h1>{loading ? <Skeleton width={200} /> : country?.name}</h1>
      <DetailRow
        label="Capital"
        value={country?.capital}
        loading={loading}
        skeletonWidth={150}
      />
      <DetailRow
        label="Currency"
        value={country?.currency}
        loading={loading}
        skeletonWidth={150}
      />
      <DetailRow
        label="Continent"
        value={country?.continent?.name}
        loading={loading}
        skeletonWidth={150}
      />
      <DetailRow
        label="Languages"
        value={country?.languages?.map((lang) => lang.name).join(', ')}
        loading={loading}
        skeletonWidth={200}
      />
    </div>
  );
};
