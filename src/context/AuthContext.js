import React, { createContext, useReducer, useContext } from "react";
import * as usersApi from "../utilities/users-api";

const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      return { ...state, user: null, token: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (credentials) => {
    const token = await usersApi.login(credentials);
    localStorage.setItem("token", token);
    const user = usersApi.getUserFromToken(token);
    dispatch({ type: "LOGIN", payload: { user, token } });
  };

  const signUp = async (userData) => {
    const token = await usersApi.signUp(userData);
    localStorage.setItem("token", token);
    const user = usersApi.getUserFromToken(token);
    dispatch({ type: "LOGIN", payload: { user, token } });
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
