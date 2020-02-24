import React from "react";
import ReactDataGrid from "react-data-grid";

function TableEditor(props) {

    return (
        <div>
            <ReactDataGrid
                columns={props.columns}
                rowGetter={i => props.rows[i]}
                rowsCount={props.rows.length}
                onGridRowsUpdated={props.onGridRowsUpdated}
                enableCellSelect={true}
                minHeight={160}
            />
            <button onClick={props.newCol}>Add col</button>
            <button onClick={props.newRow}>Add row</button>
        </div>
    )
}

export default TableEditor;