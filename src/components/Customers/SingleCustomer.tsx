import React from "react";
import { useParams } from "react-router-dom";

export const SingleCustomer: React.FC<{}> = () => {
  const { id }: any = useParams();
  alert(id);
  return id ? <h1>Welcome User {id}</h1> : <h1>ADD USER</h1>;
};
