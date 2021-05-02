import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { findIndex, omit } from "lodash";
import {
  deleteCustomers,
  fetchCustomers,
  updateCustomers,
  addCustomers
} from "../thunks/customer-thunk";

interface Customer {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface PaginationParams {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

type Data = {
  pagination: PaginationParams;
  data: Customer[];
};

const initialState: Data = {
  pagination: {
    page: 0,
    per_page: 6,
    total: 12,
    total_pages: 2
  },
  data: []
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCustomers.fulfilled, (state, { payload }) => {
      state.data = state.data.concat(payload.data);
      state.pagination = omit(payload, ["data", "support"]) as PaginationParams;
    });
    builder.addCase(fetchCustomers.rejected, (state, { payload }) => {
      console.error("CUSTOMERS LIST FETCH FAILURE", state, payload);
    });
    builder.addCase(fetchCustomers.pending, (state, { payload }) => {
      console.info("CUSTOMERS LIST FETCH PENDING");
    });

    builder.addCase(deleteCustomers.fulfilled, (state, { payload }) => {
      const index = findIndex(state.data, { id: payload });
      state.data.splice(index, 1);
    });
    builder.addCase(deleteCustomers.rejected, (state, { payload }) => {
      console.error("CUSTOMERS LIST DELETE FAILURE", state, payload);
    });

    builder.addCase(updateCustomers.fulfilled, (state, { payload }) => {
      console.log("UPDATE SUCCESS");
    });
    builder.addCase(updateCustomers.rejected, (state, { payload }) => {
      console.error("CUSTOMERS UPDATE FAILURE", state, payload);
    });

    builder.addCase(addCustomers.fulfilled, (state, { payload }) => {
      console.log("ADD SUCCESS");
    });
    builder.addCase(addCustomers.rejected, (state, { payload }) => {
      console.error("CUSTOMERS ADD FAILURE", state, payload);
    });
  }
});

export default customerSlice.reducer;
