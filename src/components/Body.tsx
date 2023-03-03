import React from 'react'
import { ISelection } from '../types/baseGrid'
import { IColumn, IRowData, RowId } from '../types/data'
import groupByFn from '../utils/groupBy'
import NotFound from './NotFound'
import Rows from './Rows'

interface IBodyProps<T extends IRowData> {
    rows: T[],
    displayedCols: IColumn<T>[],
    rowSelection?: ISelection,
    toggleRow?: (id: RowId) => void,
    groupBy?: string
}

const Body = <T extends IRowData>(props: IBodyProps<T>) => {
    const { rows, displayedCols, rowSelection, toggleRow, groupBy } = props

    if(rows.length <= 0){
        const colCount = displayedCols.length + (rowSelection ? 1 : 0)
        return <NotFound colCount={colCount}/>
    }

    if (groupBy) {
        const groupedRows = groupByFn(rows, groupBy)
        let numberOfCols = displayedCols.length
        if (rowSelection) numberOfCols += 1

        return <>{
            Object.keys(groupedRows).map(group => (
                <React.Fragment key={group}>
                    <tr style={{ backgroundColor: '#e0e0e0' }}>
                        <td colSpan={numberOfCols} style={{ fontWeight: 'bold' }}>{group}</td>
                    </tr>
                    {
                        <Rows
                            rows={groupedRows[group]}
                            displayedCols={displayedCols}
                            rowSelection={rowSelection}
                            toggleRow={toggleRow}
                        />
                    }
                </React.Fragment>

            ))}
        </>
    }
    return (
        <Rows
            rows={rows}
            displayedCols={displayedCols}
            rowSelection={rowSelection}
            toggleRow={toggleRow}
        />
    )
}

export default Body