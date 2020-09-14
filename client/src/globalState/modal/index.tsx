import React, { useContext, createContext, useState } from 'react';
import ReactDOM from 'react-dom';

interface InitialState {
  isOpen: boolean;
  modal: null | JSX.Element;
  toggleModal(): void;
  openModal(modal: JSX.Element): void;
}

const initialState: InitialState = {
  isOpen: false,
  modal: null,
  toggleModal: () => null,
  openModal: () => null,
};

const ModalContext = createContext(initialState);

export const ModalProvider: React.FC = ({ children }) => {
  const [state, setState] = useState(initialState);

  const toggleModal = () => {
    setState({ ...state, isOpen: !state.isOpen, modal: null });
  };

  const openModal = (modal: JSX.Element) => {
    setState({ ...state, isOpen: !state.isOpen, modal });
  };

  const modalElement = document.getElementById('modal');

  if (!modalElement) return null;

  return (
    <ModalContext.Provider value={{ ...state, toggleModal, openModal }}>
      {children}
      {state.modal && ReactDOM.createPortal(state.modal, modalElement)}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
