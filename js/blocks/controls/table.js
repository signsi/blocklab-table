/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BaseControl, IconButton } from '@wordpress/components';
import { useState } from '@wordpress/element';
import React from "react";
import TableEditor from '../components/TableEditor';
/**
 * Internal dependencies
 */
import { RepeaterRows } from '../components';

const columns = [
	{ key: "bezeichnung", name: "Bezeichnung", editable: true },
	{ key: "y2016", name: "2016", editable: true },
	{ key: "y2017", name: "2017", editable: true },
	{ key: "y2018", name: "2018", editable: true },
	{ key: "y2019", name: "2019", editable: true },
];

const rowsData = [
	{
		bezeichnung: "Mitarbeitende",
		y2016: 204,
		y2017: 218,
		y2018: 228,
		y2019: 332
	},
	{
		bezeichnung: "Vollzeitäquivalente",
		y2016: 100,
		y2017: 110,
		y2018: 115,
		y2019: 120
	},
	{
		bezeichnung: "Fluktuationsrate",
		y2016: 14.49,
		y2017: 16.51,
		y2018: 19.74,
		y2019: 15.4
	},
];



const TableControl = (props) => {
	const { field, instanceId, onChange, parentBlock, parentBlockProps } = props;
	const { attributes, setAttributes } = parentBlockProps;
	const attr = { ...attributes };
	const value = attr[field.name];
	const defaultRows = new Array(field.min ? field.min : 1).fill({ '': '' });
	const hasRows = value && value.hasOwnProperty('rows');
	//const rows = hasRows ? value.rows : defaultRows;

	const [rows, setRows] = useState(rowsData)

	const onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
		const newRows = rows.slice();
		for (let i = fromRow; i <= toRow; i++) {
			newRows[i] = { ...newRows[i], ...updated };
		}
		setRows(newRows)
	}

	/**
	 * Adds a new empty row, using { '': '' }.
	 *
	 * Simply using {} results in <ServerSideRender> not sending an empty row,
	 * and the empty row isn't rendered in the editor.
	 *
	 * @see https://github.com/getblocklab/block-lab/issues/393
	 */
	const addEmptyRow = () => {
		const withAddedRow = rows.concat({ '': '' });
		attr[field.name] = { rows: withAddedRow };
		setAttributes(attr);
	};

	if (!hasRows) {
		onChange({ rows: defaultRows });
	}

	return (
		<div className={"editor"}>
			<TableEditor rows={rowsData} columns={columns} onGridRowsUpdated={onGridRowsUpdated} />
		</div>
	);
};

export default TableControl;
