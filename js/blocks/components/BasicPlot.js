import React from "react";
import { XAxis, YAxis, HorizontalGridLines, LineSeries, FlexibleXYPlot as XYPlot, MarkSeries } from 'react-vis';


function BasicPlot(props) {
    const data = props.data

    const getTransformedData = () => {
        return props.columns.slice(1).map(c => {
            const row = props.row
            return {
                x: c.name,
                y: row[c.key]
            }
        })
    }


    const d = getTransformedData()

    return (
        <XYPlot>
            <HorizontalGridLines />
            <LineSeries
                data={d} />
            <XAxis
                title={"Jahr"}
                tickTotal={d.length}
                tickFormat={v => `${v}`}
            />
            <YAxis />
            <MarkSeries data={d} />
        </XYPlot>
    )
}

export default BasicPlot;
