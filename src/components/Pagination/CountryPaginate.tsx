import React from 'react';
import ReactPaginate from 'react-paginate';

type CountryPaginateProps = {
  pageCount: number;
  onPageChange: (event: { selected: number }) => void;
  previousLabel?: string;
  nextLabel?: string;
  containerClassName?: string;
  activeClassName?: string;
};

export const CountryPaginate: React.FC<CountryPaginateProps> = ({
  pageCount,
  onPageChange,
  previousLabel = '← Previous',
  nextLabel = 'Next →',
  containerClassName = 'pagination',
  activeClassName = 'active',
}) => (
  <ReactPaginate
    previousLabel={previousLabel}
    nextLabel={nextLabel}
    pageCount={pageCount}
    onPageChange={onPageChange}
    containerClassName={containerClassName}
    activeClassName={activeClassName}
  />
);
