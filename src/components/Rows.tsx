import { Checkbox } from '@mantine/core'
import useStyles from '../Styles'
import { ISelection } from '../types/baseGrid'
import { IColumn, IRowData, RowId } from '../types/data'

interface IRowsProps<T extends IRowData> {
    rows: T[],
    displayedCols: IColumn<T>[],
    toggleRow?: (id: RowId) => void,
    rowSelection?: ISelection
}

const Rows = <T extends IRowData>(props: IRowsProps<T>) => {
    const { rows, displayedCols, toggleRow, rowSelection } = props
    const {cx, classes} = useStyles()
    return (
        <>
            {rows.map((row) => {
                const selected = rowSelection ? rowSelection.selection.includes(row.id) : false;
                return (
                    <tr key={row.id} className={cx({ [classes.rowSelected]: selected })}>
                        {(rowSelection && toggleRow) &&
                            <td>
                                <Checkbox
                                    checked={rowSelection.selection.includes(row.id)}
                                    onChange={() => toggleRow(row.id)}
                                    transitionDuration={0}
                                />
                            </td>
                        }
                        {displayedCols.map(column => (
                            // @ts-ignore
                            <td key={column.label}>{
                                column.render
                                    ? column.render(row)
                                    // @ts-ignore
                                    : row[column.key]
                            }</td>
                        ))}
                    </tr>
                )
            })}
        </>
    )
}

export default Rows