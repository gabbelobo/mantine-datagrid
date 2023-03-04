import { Flex, Text, Pagination } from '@mantine/core'
import { ISelection } from '../types/baseGrid'
import { ILocalization } from '../types/localization'

interface IFooterProps {
    pagination?: boolean,
    firstRegister: number,
    lastRegister: number,
    rowSelection?: ISelection,
    handleChangePage: (newPage: number) => void,
    totalRows: number,
    activePage: number,
    localization: ILocalization,
    itemsPerPage: number
}

const Footer = (props: IFooterProps) => {
    const { pagination, firstRegister, lastRegister, rowSelection, handleChangePage, totalRows, activePage, localization, itemsPerPage } = props
    const infoString = localization.info
        .replace('_START_', firstRegister.toString())
        .replace('_END_', lastRegister.toString())
        .replace('_TOTAL_', totalRows.toString())
    return (
        <Flex justify={'space-between'} wrap='wrap-reverse'>
            {pagination && <Text>{infoString}</Text>}
            {
                (rowSelection && rowSelection.selection.length > 0) &&
                <Text>{localization.infoSelected.replace('_SELECTED_', rowSelection.selection.length.toString())}</Text>
            }
            {pagination && <Pagination page={activePage} onChange={handleChangePage} total={Math.ceil(totalRows / itemsPerPage)} />}
        </Flex>
    )
}

export default Footer