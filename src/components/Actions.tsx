import { Flex, TextInput, Group, Text, Select } from '@mantine/core'
import React from 'react'
import { Search } from 'tabler-icons-react'

interface IActionsProps {
    search: string,
    handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    itemsPerPageString: string | null,
    handleChangeItemsPerPage: (newValue: string) => void,
    pagination?: boolean,
}

const Actions = (props: IActionsProps) => {
    const { search, handleSearchChange, pagination, itemsPerPageString, handleChangeItemsPerPage } = props
    return (
        <Flex justify={'space-between'} wrap='wrap'>
            <TextInput
                placeholder="Buscar"
                mb="md"
                icon={<Search size={14} strokeWidth={1.5} />}
                value={search}
                sx={{ maxWidth: 300 }}
                onChange={handleSearchChange}
            />
            {pagination && <Group noWrap>
                <Text>Items por página</Text>
                <Select
                    data={['10', '25', '50', '100']}
                    value={itemsPerPageString} sx={{ width: 75 }}
                    onChange={handleChangeItemsPerPage}
                />
            </Group>}
        </Flex>
    )
}

export default Actions