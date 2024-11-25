export interface Country {
  code: string;
  name: string;
  capital: string | null;
  continent: {
    toLowerCase(): unknown;
    name: string;
  };
  languages: { name: string }[];
  currency: string | null;
  population?: number;
  flag?: string;
}






  