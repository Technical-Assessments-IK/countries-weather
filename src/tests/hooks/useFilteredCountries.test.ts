
import { renderHook } from "@testing-library/react";
import { useFilteredCountries } from "../../hooks/useFilteredCountries";
import type { Country } from "../../shared";

describe("useFilteredCountries", () => {
  const mockCountries: (Country & { temperature?: number })[] = [
    {
      name: "Canada",
      continent: {
          name: "America",
          toLowerCase: function (): unknown {
              throw new Error("Function not implemented.");
          }
      },
      temperature: 20,
      capital: "Ottawa",
      code: "CA",
      languages: [{ name: "English" }, { name: "French" }],
      currency: "Canadian Dollar",
      flag: "https://flagcdn.com/ca.svg",
    },
    {
      name: "France",
      continent: {
          name: "Europe",
          toLowerCase: function (): unknown {
              throw new Error("Function not implemented.");
          }
      },
      temperature: 25,
      capital: "Paris",
      code: "FR",
      languages: [{ name: "French" }],
      currency: "Euro",
      flag: "https://flagcdn.com/fr.svg",
    },
    {
      name: "Japan",
      continent: {
          name: "Asia",
          toLowerCase: function (): unknown {
              throw new Error("Function not implemented.");
          }
      },
      temperature: 30,
      capital: "Tokyo",
      code: "JP",
      languages: [{ name: "Japanese" }],
      currency: "Japanese Yen",
      flag: "https://flagcdn.com/jp.svg",
    },
  ];

  it("sorts countries by temperature ascending", () => {
    const { result } = renderHook(() =>
      useFilteredCountries(mockCountries, "", null, "temperature", "asc")
    );
    expect(result.current).toEqual([
      mockCountries[0],
      mockCountries[1],
      mockCountries[2],
    ]);
  });

  it("sorts countries by name descending", () => {
    const { result } = renderHook(() =>
      useFilteredCountries(mockCountries, "", null, "name", "desc")
    );
    expect(result.current).toEqual([
      mockCountries[2],
      mockCountries[1],
      mockCountries[0],
    ]);
  });

  it("returns all countries when no filters are applied", () => {
    const { result } = renderHook(() =>
      useFilteredCountries(mockCountries, "", null, "name", "asc")
    );
    expect(result.current).toEqual(mockCountries);
  });
});
