import React, { useState } from "react";

import { TextField } from "@mui/material";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <TextField
      type="search"
      value={query}
      onChange={handleChange}
      placeholder="Search countries..."
      className="search-bar"
      size="small"
    />
  );
};
