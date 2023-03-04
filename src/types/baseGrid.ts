import { IRowData, IColumn, IFilter, RowId } from "./data"
import { ILocalization } from "./localization"

interface ISelection {
    selection: RowId[],
    setSelection: React.Dispatch<React.SetStateAction<RowId[]>>
}

interface IBaseCustomizationProps {
    height?: string | number,
    striped?: boolean,
    localization?: ILocalization
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
    totalRows: number,
}

export type { IBaseGridProps, IBaseCustomizationProps, ICallbackProps, ISelection, IOptionsProps }