import { useState, useCallback } from 'react';

export function useApiStatus<T>(asyncFunction: () => Promise<T>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await asyncFunction();
      setLoading(false);
      return response;
    } catch (err) {
      setError(err as Error);
      setLoading(false);
      throw err;
    }
  }, [asyncFunction]);

  return {
    loading,
    error,
    retry: execute,
  };
}
