import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import customerReducer from "./customerSlice";
export const rootReducer = combineReducers({
  login: loginReducer,
  customers: customerReducer
});
