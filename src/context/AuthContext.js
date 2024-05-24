import React, { createContext, useReducer, useContext, useEffect } from "react";
import * as usersApi from "../utilities/users-api";

const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: true, // Add loading state
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };
    case "LOGOUT":
      return { ...state, user: null, token: null, loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const user = usersApi.getUserFromToken(token);
          dispatch({ type: "LOGIN", payload: { user, token } });
        } catch (err) {
          console.error("Invalid token");
          localStorage.removeItem("token");
          dispatch({ type: "SET_LOADING", payload: false });
        }
      } else {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };
    checkToken();
  }, []);

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
