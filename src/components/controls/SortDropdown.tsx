import React from "react";

type SortOption = {
  label: string;
  value: "name-asc" | "name-desc" | "temperature-asc" | "temperature-desc";
};

type SortDropdownProps = {
  options: SortOption[];
  onSort: (key: string, direction: "asc" | "desc") => void;
  label: string;
};

export const SortDropdown: React.FC<SortDropdownProps> = ({ options, onSort, label }) => {
  const dropdownId = `sort-dropdown-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <>
      <label htmlFor={dropdownId}>{label}</label>
      <select
        id={dropdownId}
        onChange={(e) => {
          const [key, direction] = e.target.value.split("-");
          onSort(key, direction as "asc" | "desc");
        }}
        className="sort-dropdown"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};
