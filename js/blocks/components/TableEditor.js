import React, { useState } from "react";
import ReactDataGrid from "react-data-grid";

function TableEditor(props) {

    return (
        <ReactDataGrid
            columns={props.columns}
            rowGetter={i => props.rows[i]}
            rowsCount={props.rows.length}
            onGridRowsUpdated={props.onGridRowsUpdated}
            enableCellSelect={true}
            minHeight={160}
        />
    )
}

export default TableEditor;