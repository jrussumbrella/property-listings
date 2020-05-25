import { User } from "../../lib";
import { SET_USER } from "./authTypes";

type State = {
  isLoading: boolean;
  user: User | null;
};

type Action = {
  type: string;
  payload: User;
};

export const authReducer = (state: State, action: Action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload, isLoading: false };
    default:
      return state;
  }
};
