import { Flex, TextInput, Group, Text, Select } from '@mantine/core'
import React from 'react'
import { Search } from 'tabler-icons-react'
import { ILocalization } from '../types/localization'

interface IActionsProps {
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>,
    itemsPerPageString: string | null,
    handleChangeItemsPerPage: (newValue: string) => void,
    pagination?: boolean,
    localization: ILocalization
}

const Actions = (props: IActionsProps) => {
    const { search, setSearch, pagination, itemsPerPageString, handleChangeItemsPerPage, localization } = props
    return (
        <Flex justify={'space-between'} wrap='wrap'>
            <TextInput
                placeholder={localization.search}
                mb="md"
                icon={<Search size={14} strokeWidth={1.5} />}
                value={search}
                sx={{ maxWidth: 300 }}
                onChange={e => setSearch(e.target.value)}
            />
            { pagination &&
                <Group noWrap>
                    <Text>{localization.itemsPerPage}</Text>
                    <Select
                        data={['10', '25', '50', '100']}
                        value={itemsPerPageString} sx={{ width: 75 }}
                        onChange={handleChangeItemsPerPage}
                    />
                </Group>
            }
        </Flex>
    )
}

export default Actions