import { IRowData, IColumn, IFilter, RowId } from "./data"

interface ISelection {
    selection: RowId[],
    setSelection: React.Dispatch<React.SetStateAction<RowId[]>>
}

interface IBaseCustomizationProps {
    height?: string | number,
    striped?: boolean
}

interface IOptionsProps {
    rowSelection?: ISelection,
    groupBy?: string,
    pagination?: boolean
}

interface ICallbackProps<T> {
    onFilterChange?: (filter: IFilter<T>) => void,
}

interface IBaseGridProps<T extends IRowData> extends IBaseCustomizationProps, ICallbackProps<T>, IOptionsProps {
    columns: IColumn<T>[],
    pageRows: T[],
    totalPages: number,
}

export type { IBaseGridProps, IBaseCustomizationProps, ICallbackProps, ISelection, IOptionsProps }