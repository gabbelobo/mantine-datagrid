import { useState } from 'react'
import { BaseGrid } from './BaseGrid';
import { IRowData, IFilter } from './types/data';
import { IDataGridProps } from './types/dataGrid';
import sortData from './utils/sort';

const DataGrid = <T extends IRowData>({ columns, rows, height, striped, rowSelection, groupBy, pagination, localization }: IDataGridProps<T>) => {
    const [totalPages, setTotalPages] = useState(0)
    const [sortedData, setSortedData] = useState<T[]>(rows);

    const onFilterChange = (filter: IFilter<T>) => {
        const { search, sortBy, reversed, itemsPerPage, page } = filter

        const sorted = sortData(rows, {
            search: search,
            sortBy: sortBy,
            reversed: reversed
        })
        setTotalPages(Math.ceil(sorted.length / itemsPerPage))

        
        if(pagination){
            const pageRows = sorted.slice((page - 1) * itemsPerPage, page * itemsPerPage)
            setSortedData(pageRows) 
        }
        else {
            setSortedData(sorted)
        }
        
    }

    const customizationProps = {
        height,
        striped,
        localization
    }
    const optionsProps = {
        rowSelection,
        groupBy,
        pagination
    }

    return (
        <BaseGrid
            //@ts-ignore
            columns={columns}
            pageRows={sortedData}
            totalRows={rows.length}
            onFilterChange={onFilterChange}
            {...optionsProps}
            {...customizationProps}
        />
    )
}

export default DataGrid