import React, { useContext, createContext, useState } from "react";

interface InitialState {
  isOpen: boolean;
  toggleModal(): void;
}

const initialState: InitialState = {
  isOpen: false,
  toggleModal: () => {},
};

const ModalContext = createContext(initialState);

export const ModalProvider: React.FC = ({ children }) => {
  const [state, setState] = useState(initialState);

  const toggleModal = () => {
    setState({ ...state, isOpen: !state.isOpen });
  };

  return (
    <ModalContext.Provider value={{ ...state, toggleModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
