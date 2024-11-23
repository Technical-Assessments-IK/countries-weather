export interface Country {
  code: string;
  name: string;
  capital: string | null;
  continent: {
    name: string;
  };
  languages: { name: string }[];
  currency: string | null;
  population?: number;
  flag?: string;
}

export interface CountryAPIResponse {
  countries: Country[];
}

export type Weather = {
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
};

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
}
  