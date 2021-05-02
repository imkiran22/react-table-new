import axios from "axios";

export const customerAPI = async function (
  payload: { per_page: number } = { per_page: 1 }
) {
  const url = `https://reqres.in/api/users?page=${payload.per_page}`;
  return await axios.get(url);
};

export const deleteCustomerAPI = async function (id: string) {
  const url = `https://reqres.in/api/users/${id}`;
  return await axios.delete(url);
};

export const updateCustomerAPI = async function (payload: {
  [key: string]: any;
}) {
  const url = `https://reqres.in/api/users/${payload.id}`;
  const obj = {
    name: payload.firstName,
    job: payload.email
  };
  return await axios.patch(url, obj);
};

export const addCustomerAPI = async function (payload: { [key: string]: any }) {
  const url = `https://reqres.in/api/users`;
  const obj = {
    name: payload.firstName,
    job: payload.email
  };
  return await axios.post(url, obj);
};
