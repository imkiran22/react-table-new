import axios from "axios";
import { LoginFormState } from "../thunks/login-thunk";

export const loginAPI = async function (payload: LoginFormState) {
  const url = `https://reqres.in/api/login`;
  const request = axios.post(url, {
    email: "eve.holt@reqres.in",
    password: "cityslicka"
  });
  return await request;
};
