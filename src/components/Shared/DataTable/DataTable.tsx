import { startCase, upperCase } from "lodash";
import React, { Fragment } from "react";
import "./DataTable.scss";
interface DataTableProps {
  data: any[];
  columns: Array<Record<string, string>>;
  onDelete: (val: string) => {};
  onEdit: (val: string) => {};
}

interface TableHeaderProps {
  columns: Array<Record<string, string>>;
}

interface TableContentProps extends TableHeaderProps {
  data: any[];
  onDelete: (val: string) => {};
  onEdit: (val: string) => {};
}

const TableHeader: React.FC<TableHeaderProps> = ({ columns }) => {
  return (
    <div className="header">
      {columns.map((data: any, index: number) => (
        <div
          style={{ flexBasis: data[Object.keys(data)[0]] }}
          className="column"
          key={index}
        >
          {upperCase(startCase(Object.keys(data)[0]))}
        </div>
      ))}
    </div>
  );
};

const TableContent: React.FC<TableContentProps> = ({
  data,
  columns,
  onDelete,
  onEdit
}) => {
  return (
    <div className="content">
      {data.map((d: any, index: number) => (
        <div className="row" key={index}>
          {columns.map((c: any, index: number) => (
            <div
              style={{ flexBasis: c[Object.keys(c)[0]] }}
              className="field"
              key={index}
            >
              {Object.keys(c)[0] === "actions" ? (
                <div>
                  <button className="button" onClick={() => onEdit(d["id"])}>
                    Edit
                  </button>
                  <button className="button" onClick={() => onDelete(d["id"])}>
                    Delete
                  </button>
                </div>
              ) : (
                startCase(d[Object.keys(c)[0]])
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export const DataTable: React.FC<DataTableProps> = ({
  data = [],
  columns = [],
  onDelete,
  onEdit
}) => {
  return (
    <div className="table-flex-container">
      <TableHeader columns={columns} />
      <TableContent
        columns={columns}
        data={data}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
  );
};
