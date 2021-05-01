import { createAsyncThunk } from "@reduxjs/toolkit";
import { customerAPI, deleteCustomerAPI } from "../api/customer";

export const fetchCustomers = createAsyncThunk<any, { per_page: number }>(
  "login/user",
  async (payload) => {
    const response = await customerAPI(payload);
    return response.data;
  }
);

export const deleteCustomers = createAsyncThunk<any, string>(
  "delete/user",
  async (id) => {
    const response = await deleteCustomerAPI(id);
    return id;
  }
);
