/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BaseControl, IconButton } from '@wordpress/components';
import { useState } from '@wordpress/element';
import React from "react";
import TableEditor from '../components/TableEditor';
import BasicPlot from '../components/BasicPlot';
/**
 * Internal dependencies
 */
import { RepeaterRows } from '../components';

const colData = [
	{ key: "bezeichnung", name: "Bezeichnung", editable: true },
	{ key: 2016, name: 2016, editable: true },
	{ key: 2017, name: 2017, editable: true },
	{ key: 2018, name: 2018, editable: true },
	{ key: 2019, name: 2019, editable: true },
];

const rowsData = [
	{
		bezeichnung: "Mitarbeitende",
		2016: 204,
		2017: 218,
		2018: 228,
		2019: 332
	},
	{
		bezeichnung: "Vollzeitäquivalente",
		2016: 100,
		2017: 110,
		2018: 115,
		2019: 120
	},
	{
		bezeichnung: "Fluktuationsrate",
		2016: 14.49,
		2017: 16.51,
		2018: 19.74,
		2019: 15.4
	},
];

const getCurrentColIndex = (cols) => {
	// TODO: assuming the last entry is the one with the biggest year
	const lastEntry = cols[cols.length - 1]
	const highestYear = lastEntry.key
	return highestYear
}

const getUpdatedRows = (rows, newIndex) => {
	const updatedRows = rows.map(row => {
		return {
			...row,
			newIndex: newIndex
		}
	})
	return updatedRows
}

const getNewData = (rows, cols) => {
	const data = {
		"rows": rows,
		"cols": cols
	}

	const jsonData = JSON.stringify(data)
	return jsonData
}


const TableControl = (props) => {
	console.log("props", props)
	const { field, getValue, instanceId, onChange, parentBlockProps, rowIndex } = props;
	console.log(getValue)
	const initialValue = getValue(props);
	console.log("initial", initialValue)

	const [rows, setRows] = useState(rowsData)
	const [cols, setCols] = useState(colData)

	const onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
		const newRows = rows.slice();
		for (let i = fromRow; i <= toRow; i++) {
			newRows[i] = { ...newRows[i], ...updated };
		}
		setRows(newRows)
	}

	const addNewCol = () => {
		const currentIndex = getCurrentColIndex(cols)
		const newIndex = currentIndex + 1
		const updatedCols = [
			...cols,
			{ key: newIndex, name: newIndex, editable: true }
		]
		setCols(updatedCols)
		const updatedRows = getUpdatedRows(rows, newIndex)
		setRows(updatedRows)
		const newData = getNewData(updatedRows, updatedCols)
		onChange(newData)
	}

	const style = {
		margin: "10px"
	}

	return (
		<div className={"root"}>
			<input type="hidden" value={jsonData} />
			<div className={"editor"} style={style}>
				<TableEditor rows={rows} columns={cols} onGridRowsUpdated={onGridRowsUpdated} newRow={() => console.log()} newCol={() => addNewCol()} />
			</div>
			<div className={"plots"}>
				<BasicPlot row={rows[0]} columns={cols} />
				<BasicPlot row={rows[1]} columns={cols} />
				<BasicPlot row={rows[2]} columns={cols} />
			</div>
		</div>
	);
};

export default TableControl;
