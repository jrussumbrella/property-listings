import React, { createContext, useContext, useState } from 'react';

interface InitialState {
  isActive: boolean;
  type: string;
  message: string;
  setToast(type: string, message: string): void;
  removeToast(): void;
}

const initialState = {
  isActive: false,
  type: '',
  message: '',
  setToast: () => null,
  removeToast: () => null,
};

export const ToastContext = createContext<InitialState>(initialState);

export const ToastProvider: React.FC = ({ children }) => {
  const [state, setState] = useState(initialState);

  const removeToast = () => {
    setState(initialState);
  };

  const setToast = (type: string, message: string) => {
    setState({ ...state, message, type, isActive: true });
    setTimeout(() => {
      removeToast();
    }, 4000);
  };

  return (
    <ToastContext.Provider value={{ ...state, setToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
