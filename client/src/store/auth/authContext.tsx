import React, { createContext, useContext, useReducer } from "react";
import { authReducer } from "./authReducer";
import { SET_USER } from "./authTypes";
import { Viewer, User } from "../../lib";
import cookie from "js-cookie";

interface InitialStateType {
  user: User | null;
  isLoading: boolean;
  login(viewer: Viewer): void;
  loadUser(user: User): void;
}

const initialState = {
  user: null,
  isLoading: true,
  login: (viewer: Viewer) => {},
  loadUser: (user: User) => {},
};

export const AuthContext = createContext<InitialStateType>(initialState);

export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const autoLogin = (viewer: Viewer) => {
    cookie.set("token", viewer.token);
    dispatch({ type: SET_USER, payload: viewer.user });
  };

  const login = (viewer: Viewer) => {
    autoLogin(viewer);
  };

  const loadUser = (user: User) => {
    dispatch({ type: SET_USER, payload: user });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, loadUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
