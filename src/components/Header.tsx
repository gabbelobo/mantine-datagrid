
import { Checkbox } from '@mantine/core'
import Th from './Th'
import { ISelection } from '../types/baseGrid'
import { IColumn, IRowData } from '../types/data'
interface IHeaderProps<T extends IRowData> {
    displayedCols: IColumn<T>[],
    reverseSortDirection: boolean,
    numberOfRows: number,
    toggleAll: () => void,
    handleChangeSorting: (field: keyof T) => void,
    sortBy: keyof T | null,
    rowSelection?: ISelection,
}

const Header = <T extends IRowData>(props: IHeaderProps<T>) => {
    const { displayedCols, reverseSortDirection, numberOfRows, toggleAll, handleChangeSorting, sortBy, rowSelection } = props
    return (
        <tr>
            {rowSelection &&
                <th style={{ width: 40 }}>
                    <Checkbox
                        onChange={toggleAll}
                        checked={numberOfRows > 0 && rowSelection.selection.length === numberOfRows}
                        indeterminate={rowSelection.selection.length > 0 && rowSelection.selection.length !== numberOfRows}
                        transitionDuration={0}
                    />
                </th>
            }
            {
                displayedCols.map(column => (
                    <Th
                        key={column.label}
                        sorted={sortBy === column.key}
                        reversed={reverseSortDirection}
                        onSort={() => handleChangeSorting(column.key)}
                    >
                        {column.label}
                    </Th>
                ))
            }
        </tr>
    )
}

export default Header