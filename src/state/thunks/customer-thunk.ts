import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addCustomerAPI,
  customerAPI,
  deleteCustomerAPI,
  updateCustomerAPI
} from "../api/customer";

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

export const updateCustomers = createAsyncThunk<any, { [key: string]: any }>(
  "edit/user",
  async (payload) => {
    const response = await updateCustomerAPI(payload);
    return response.data;
  }
);

export const addCustomers = createAsyncThunk<any, { [key: string]: any }>(
  "add/user",
  async (payload) => {
    const response = await addCustomerAPI(payload);
    return response.data;
  }
);
