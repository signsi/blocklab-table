import React from "react";
import ReactDataGrid from "react-data-grid";

function TableEditor(props) {

    return (
        <React.Fragment>
            <div className={"cols"}>
                <div className={"col col-11"}>
                    <ReactDataGrid
                        columns={props.columns}
                        rowGetter={i => props.rows[i]}
                        rowsCount={props.rows.length}
                        onGridRowsUpdated={props.onGridRowsUpdated}
                        enableCellSelect={true}
                        minHeight={160}
                    />
                </div>
                <div className={"col col-1"}>
                    <button onClick={props.newCol}>Add col</button>
                </div>
            </div>
            <button onClick={props.newRow}>Add row</button>
        </React.Fragment>
    )
}

export default TableEditor;