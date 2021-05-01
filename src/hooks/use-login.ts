import React, { useReducer } from "react";

interface FormState {
  userName: string;
  password: string;
}

interface Action {
  type: string;
  value: string;
}

const initialFormState = { userName: "", password: "" };

const formReducer = (state: FormState, action: Action) => {
  let newState;
  let { type, value } = action;
  switch (type) {
    case "SET_USERNAME":
      newState = { ...state, userName: value };
      return newState;
    case "SET_PASSWORD":
      newState = { ...state, password: value };
      return newState;
    default:
      return state;
  }
};

export const useLogin = () => {
  const [state, dispatchFn] = useReducer(formReducer, initialFormState);
  return { state, dispatchFn };
};
