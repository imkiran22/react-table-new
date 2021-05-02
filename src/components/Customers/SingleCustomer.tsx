import { findIndex } from "lodash";
import React, { useReducer } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  addCustomers,
  updateCustomers
} from "../../state/thunks/customer-thunk";

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
  const appDispatch = useAppDispatch();
  const history = useHistory();
  const customers = useAppSelector((state) => state.customers.data);
  const redirect = () => {
    alert(id ? "UPDATED CUSTOMER" : "ADDED CUSTOMER");
    history.push("/customers");
  };
  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (id) {
      const data = { ...state, id };
      console.log(data);
      appDispatch(updateCustomers(data)).then(redirect);
    } else {
      appDispatch(addCustomers({ ...state })).then(redirect);
    }
  };

  React.useEffect(() => {
    const index = findIndex(customers, { id: parseInt(id, 10) });
    if (index > -1) {
      let { first_name, last_name, email } = customers[index];
      dispatch({
        type: "SET_FIRSTNAME",
        value: first_name
      });
      dispatch({
        type: "SET_LASTNAME",
        value: last_name
      });
      dispatch({
        type: "SET_EMAIL",
        value: email
      });
    }
  }, [customers]);
  return (
    <div className="user-form">
      <form noValidate onSubmit={onSubmit}>
        <h1>{id ? "EDIT USER" : "ADD USER"}</h1>
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
            {!id ? "ADD" : "UPDATE"}
          </button>
        </div>
      </form>
    </div>
  );
};
