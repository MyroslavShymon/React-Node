import React from "react";

export const useHttp = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const request = React.useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      if (body) {
        body = JSON.stringify(body);
        headers["Content-Type"] = "application/json"; // Вказуєио що передаєм по мережі JSON
      }
      setLoading(true);
      try {
        const response = await fetch(url, { method, body, headers });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Something get wrong");
        }

        setLoading(false);

        return data;
      } catch (error) {
        setLoading(false);
        setError(error.message);
        throw error;
      }
    },
    []
  );

  const clearError = React.useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};
