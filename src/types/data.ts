type RowId = string | number

interface IRowData {
    id: RowId,
}

interface IColumn<T extends IRowData> {
    label: string,
    key: keyof T,
    hidden?: boolean,
    render?: (row: T) => JSX.Element 
}

interface IFilter<T> {
    search: string,
    itemsPerPage: number,
    sortBy: keyof T | null,
    reversed: boolean,
    page: number
}

export type { IRowData, IColumn, IFilter, RowId }