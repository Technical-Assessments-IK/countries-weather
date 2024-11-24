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






  