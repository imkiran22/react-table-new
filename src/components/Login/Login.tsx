import React from "react";
import "./Login.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { initLogin } from "../../state/thunks/login-thunk";
import { history } from "../../history";
import { useLogin } from "../../hooks";

export const Login: React.FC<any> = () => {
  const loginState = useAppSelector((state) => state.login);
  const { state, dispatchFn } = useLogin();
  const dispatch = useAppDispatch();
  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    dispatch(initLogin(state));
  };

  React.useEffect(() => {
    const { token } = loginState;
    if (token) {
      history.push("/customers");
    }
  }, [loginState]);

  return (
    <div className="login">
      <form noValidate onSubmit={onSubmit}>
        <div className="username form-input">
          <label>Username</label>
          <input
            type="text"
            id="username"
            value={state.userName}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
              dispatchFn({
                type: "SET_USERNAME",
                value: ev.target.value
              });
            }}
            className="username"
          />
        </div>
        <div className="password form-input">
          <label>Password</label>
          <input
            type="password"
            id="password"
            value={state.password}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
              dispatchFn({
                type: "SET_PASSWORD",
                value: ev.target.value
              });
            }}
            className="password"
          />
        </div>
        <div className="submit">
          <button className="button" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
