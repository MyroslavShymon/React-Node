import React, { createContext } from "react";

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: null,
  logout: null,
  isAuthenticated: null,
});
