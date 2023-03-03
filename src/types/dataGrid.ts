import { ICallbackProps, IBaseCustomizationProps, IOptionsProps } from "./baseGrid"
import { IRowData, IColumn } from "./data"

interface IDataGridProps<T extends IRowData> extends IBaseCustomizationProps, ICallbackProps<T>, IOptionsProps {
    columns: IColumn<T>[]
    rows: T[]
}

export type { IDataGridProps }