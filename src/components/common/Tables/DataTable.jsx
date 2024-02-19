 
import { useTable, useSortBy } from "react-table";
import "./Style.scss";
import { BsSortDownAlt } from "react-icons/bs";
import { BsSortDown } from "react-icons/bs";
 

const DataTable = (props) => {
  const columns = props.columns;
  const data = props.row;
  const TableInstances = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    TableInstances;

  return (
    <table
      style={
        {
          // width:"100%"
        }
      }
      {...getTableProps()}
    >
      <thead className="thead">
        {headerGroups.map((headerGroup,index) => (
          <tr {...headerGroup.getHeaderGroupProps()} key= {index}>
            {headerGroup.headers.map((column,index) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())} key= {index}>
                {column.render("Header")}
                <span>
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <BsSortDown />
                    ) : (
                      <BsSortDownAlt />
                    )
                  ) : (
                    ""
                  )}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row,index) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key= {index}>
              {row.cells.map((cell,index) => {
                return <td {...cell.getCellProps()} key= {index}>{cell.render("Cell")} </td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

{
  /* <Link style={{unset:"none"}} to={"/ticketHistory"}></Link> */
}
export default DataTable;
