import React from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from ".";
import {
  fetchCustomers,
  deleteCustomers
} from "../state/thunks/customer-thunk";
export const useCustomer = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const customers = useAppSelector((state) => state.customers);

  const onDelete = (val: string) => {
    if (window.confirm("Are you sure you want to delete the user?")) {
      dispatch(deleteCustomers(val));
    }
  };

  const onEdit = (val: string) => {
    history.push(`/edituser/${val}`);
  };

  const onAdd = () => {
    history.push(`/adduser`);
  };

  React.useEffect(() => {
    const { total_pages, page } = customers.pagination;
    if (page < total_pages) {
      dispatch(fetchCustomers({ per_page: page + 1 }));
      console.log("CALLED");
    }
  }, [customers.pagination]);

  return { customers, onDelete, onEdit, onAdd };
};
