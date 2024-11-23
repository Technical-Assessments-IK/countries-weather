import React from 'react';

export const FilterDropdown = ({
  options,
  onFilter,
  label,
}: {
  options: string[];
  onFilter: (value: string) => void;
  label: string;
}) => {
  return (
    <>
      <label>{label}:</label>
      <select onChange={(e) => onFilter(e.target.value)} className="filter-dropdown">
        <option value="">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};
