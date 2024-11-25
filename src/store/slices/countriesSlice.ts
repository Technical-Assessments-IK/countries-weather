import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Country } from "@/shared";

export type CountriesState = {
  countries: Country[];
  enrichedCountries: (Country & { temperature?: number })[];
  loading: boolean;
  error: string | null;
};

export const initialState: CountriesState = {
  countries: [],
  enrichedCountries: [],
  loading: false,
  error: null,
};

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    fetchCountriesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCountriesSuccess(state, action: PayloadAction<Country[]>) {
      state.countries = action.payload;
      state.loading = false;
    },
    fetchCountriesFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    enrichCountries(state, action: PayloadAction<(Country & { temperature?: number })[]>) {
      state.enrichedCountries = action.payload;
    },
  },
});

export const {
  fetchCountriesStart,
  fetchCountriesSuccess,
  fetchCountriesFailure,
  enrichCountries,
} = countriesSlice.actions;

export default countriesSlice.reducer;
