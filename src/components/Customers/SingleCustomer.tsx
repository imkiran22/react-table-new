import React, { useReducer } from "react";
import { useParams } from "react-router-dom";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
}

interface Action {
  type: string;
  value: string;
}

const reducer = (state: FormState, action: Action) => {
  let newState;
  let { type, value } = action;
  switch (type) {
    case "SET_FIRSTNAME":
      newState = { ...state, firstName: value };
      return newState;
    case "SET_LASTNAME":
      newState = { ...state, lastName: value };
      return newState;
    case "SET_EMAIL":
      newState = { ...state, email: value };
      return newState;
    default:
      return state;
  }
};

export const SingleCustomer: React.FC<{}> = () => {
  const { id }: any = useParams();
  const [state, dispatch] = useReducer(reducer, {
    firstName: "",
    lastName: "",
    email: ""
  });
  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    console.log("ONSUBMIT", state);
  };
  return (
    <div className="user-form">
      <form noValidate onSubmit={onSubmit}>
        <div className="form-input">
          <label>First Name</label>
          <input
            type="text"
            className="first_name"
            onChange={(ev) =>
              dispatch({ type: "SET_FIRSTNAME", value: ev.target.value })
            }
            value={state.firstName}
          />
        </div>
        <div className="form-input">
          <label>Last Name</label>
          <input
            type="text"
            className="last_name"
            onChange={(ev) =>
              dispatch({ type: "SET_LASTNAME", value: ev.target.value })
            }
            value={state.lastName}
          />
        </div>
        <div className="form-input">
          <label>Email</label>
          <input
            type="text"
            className="email"
            onChange={(ev) =>
              dispatch({ type: "SET_EMAIL", value: ev.target.value })
            }
            value={state.email}
          />
        </div>
        <div className="form-input">
          <button className="button" type="submit">
            {!id ? "ADD USER" : "UPDATE USER"}
          </button>
        </div>
      </form>
    </div>
  );
};
