import { Flex, Text, Pagination } from '@mantine/core'
import { ISelection } from '../types/baseGrid'

interface IFooterProps {
    pagination?: boolean,
    firstRegister: number,
    lastRegister: number,
    rowSelection?: ISelection,
    handleChangePage: (newPage: number) => void,
    totalPages: number,
    activePage: number
}

const Footer = (props: IFooterProps) => {
    const {pagination, firstRegister, lastRegister, rowSelection, handleChangePage, totalPages, activePage} = props
    return (
        <Flex justify={'space-between'} wrap='wrap-reverse'>
            {pagination && <Text>Mostrando de {firstRegister} até {lastRegister} registros</Text>}
            {
                (rowSelection && rowSelection.selection.length > 0) &&
                <Text>Selecionados {rowSelection.selection.length} registros</Text>
            }
            {pagination && <Pagination page={activePage} onChange={handleChangePage} total={totalPages} />}
        </Flex>
    )
}

export default Footer