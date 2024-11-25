import { useState } from "react";

export const useErrorHandling = () => {
  const [error, setError] = useState<string | null>(null);

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError("An unexpected error occurred.");
    }
  };

  return { error, setError, handleError };
};
