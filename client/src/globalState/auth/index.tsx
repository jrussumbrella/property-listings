import React, { createContext, useContext, useReducer } from 'react';
import cookie from 'js-cookie';
import reducer from './reducer';
import { SET_USER, LOG_OUT, AUTH_ERROR } from './constants';
import { Viewer, User } from '../../types';

interface InitialStateType {
  user: User | null;
  isLoading: boolean;
  login(viewer: Viewer): void;
  loadUser(user: User): void;
  logout(): void;
  setAuthError(): void;
}

const initialState = {
  user: null,
  isLoading: true,
  login: () => null,
  loadUser: () => null,
  logout: () => null,
  setAuthError: () => null,
};

export const AuthContext = createContext<InitialStateType>(initialState);

export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const autoLogin = (viewer: Viewer) => {
    cookie.set('token', viewer.token);
    dispatch({ type: SET_USER, payload: viewer.user });
  };

  const login = (viewer: Viewer) => {
    autoLogin(viewer);
  };

  const logout = () => {
    cookie.remove('token');
    dispatch({ type: LOG_OUT, payload: null });
  };

  const loadUser = (user: User) => {
    dispatch({ type: SET_USER, payload: user });
  };

  const setAuthError = () => {
    dispatch({ type: AUTH_ERROR, payload: null });
  };

  return (
    <AuthContext.Provider
      value={{ ...state, login, loadUser, logout, setAuthError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
