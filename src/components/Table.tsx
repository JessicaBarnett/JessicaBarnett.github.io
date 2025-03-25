import { TableRowT } from "@src/types/data-types";

export type TableComponentProps = {
    data: TableRowT[];
};

function Table({ data }: TableComponentProps) {
    return (
        <table className="stack-table">
            <tbody>
                {data.map((row) => (
                    <tr key={row.heading}>
                        <th>{row.heading}</th>
                        <td>{row.value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;
