import React from "react";

const storgeName = "userData";

export const useAuth = () => {
  const [token, setToken] = React.useState(null);
  const [ready, setReady] = React.useState(false);
  const [userId, setUserId] = React.useState(null);

  const login = React.useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(
      storgeName,
      JSON.stringify({ userId: id, token: jwtToken })
    );
  }, []);

  const logout = React.useCallback(() => {
    console.log("logoutlogoutlogoutlogoutlogoutlogoutlogoutlogout");
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storgeName);
  }, []);

  React.useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storgeName));

    if (data && data.token) {
      login(data.token, data.userId);
    }

    setReady(true);
  }, [login]);

  return { login, logout, token, userId };
};
