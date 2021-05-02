import React from "react";
import "./Customers.scss";
import { useCustomer } from "../../hooks";
import { DataTable } from "../Shared/DataTable";
import { startsWith } from "lodash";
const COLUMNS_LIST = [
  { id: "5%" },
  { first_name: "20%" },
  { last_name: "20%" },
  { email: "25%" },
  { avatar: "20%" },
  { actions: "10%" }
];
const COLUMN_KEYS = COLUMNS_LIST.map((c) => Object.keys(c).shift());
export const Customers: React.FC<{}> = () => {
  const { customers, onDelete, onEdit, onAdd } = useCustomer();
  const [search, setSearchName] = React.useState("");
  const { data = [] } = customers;
  const [customerList, setCustomerList] = React.useState(data);

  const checkAgainstColumns = (data: any, value: string) => {
    for (let c of COLUMN_KEYS) {
      if (
        c &&
        data[c] &&
        startsWith(data[c].toString().toLowerCase(), value.toLowerCase())
      ) {
        return true;
      }
    }
    return false;
  };
  const filterSearch = (value: string) => {
    const filteredData = data.filter((d) => checkAgainstColumns(d, value));
    setCustomerList(filteredData);
  };
  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;
    setSearchName(value);
    filterSearch(value);
  };

  React.useEffect(() => {
    setCustomerList(data);
  }, [data]);

  console.log("DATA", customers);

  return (
    <div className="customers">
      <h1 data-testid="customer-title">My Customers</h1>
      <div className="search">
        <input
          placeholder="Search for usernames email"
          type="text"
          data-testid="search-input"
          id="search-input"
          onChange={onChange}
          value={search}
        />
      </div>
      <div className="adduser" data-testid="adduser">
        <button className="button" onClick={onAdd}>
          Add User
        </button>
      </div>
      <div className="grid-container" data-testid="datatable">
        <DataTable
          data={customerList}
          columns={[...COLUMNS_LIST]}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </div>
    </div>
  );
};
