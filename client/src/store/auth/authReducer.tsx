import { User } from "../../lib";
import { SET_USER, LOG_OUT, AUTH_ERROR } from "./authTypes";

type State = {
  isLoading: boolean;
  user: User | null;
};

type Action = {
  type: string;
  payload: User | null;
};

export const authReducer = (state: State, action: Action): State => {
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
