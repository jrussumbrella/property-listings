import { User } from '../../types';
import { SET_USER, LOG_OUT, AUTH_ERROR } from './constants';

type State = {
  isLoading: boolean;
  user: User | null;
};

type Action = {
  type: string;
  payload: User | null;
};

export default (state: State, action: Action): State => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload, isLoading: false };
    case LOG_OUT:
      return { ...state, user: null, isLoading: false };
    case AUTH_ERROR:
      return { ...state, user: null, isLoading: false };
    default:
      return state;
  }
};
