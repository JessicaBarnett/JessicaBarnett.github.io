import { StrTuple } from "@src/types/data-types";

export type StackTableComponentProps = {
    data: StrTuple[];
};

function StackTable({ data }: StackTableComponentProps) {
    return (
        <table className="stack-table">
            <tbody>
                {data.map((tuple) => (
                    <tr>
                        <th>{tuple[0]}</th>
                        <td>{tuple[1]}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default StackTable;
