import { useState, useEffect } from 'react';
import { Table, ScrollArea, Box } from '@mantine/core';
import useStyles from './Styles';
import { IRowData, IFilter, RowId } from './types/data';
import { IBaseGridProps } from './types/baseGrid';
import Body from './components/Body';
import Header from './components/Header';
import Footer from './components/Footer';
import Actions from './components/Actions';
import english from './localization/en.json'
import useDebouncedValue from './hooks/useDebounceValue';

const BaseGrid = <T extends IRowData>(props: IBaseGridProps<T>) => {
    // Props
    const { columns, pageRows, totalRows } = props

    // Options props
    const { rowSelection, groupBy, pagination, debounceTime = 200 } = props

    // Callback props
    const { onFilterChange } = props

    // Customization props
    const { height, striped = false, localization = english } = props

    // Hooks
    const { classes, cx } = useStyles();

    // State
    const [sortBy, setSortBy] = useState<keyof T | null>(null);
    const [search, setSearch] = useState('');
    const [debouncedSearch] = useDebouncedValue(search, debounceTime)
    const [itemsPerPageString, setItemsPerPage] = useState<string | null>('10')
    const [reverseSortDirection, setReverseSortDirection] = useState(false);
    const [activePage, setActivePage] = useState(1)
    const [scrolled, setScrolled] = useState(false);

    // Utils
    const toggleRow = (id: RowId) => {
        if (!rowSelection) return
        rowSelection.setSelection((current) =>
            current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
        )
    }

    const toggleAll = () => {
        if (!rowSelection) return
        rowSelection.setSelection((current) => (current.length === pageRows.length ? [] : pageRows.map((item) => item.id)));
    }

    const handleSearchChange = (value: string) => {
        setActivePage(1)
        let filter = getFilter()
        filter.page = 1
        filter.search = value
        handleFilterChange(filter)
    }

    const handleChangePage = (newPage: number) => {
        setActivePage(newPage)
        let filter = getFilter()
        filter.page = newPage
        handleFilterChange(filter)
    }

    const handleChangeItemsPerPage = (value: string | null) => {
        if (value == null) return
        setItemsPerPage(value)
        setActivePage(1)
        let filter = getFilter()
        filter.page = 1
        filter.itemsPerPage = parseInt(value)
        handleFilterChange(filter)
    }

    const getFilter = (): IFilter<T> => ({
        search,
        itemsPerPage,
        reversed: reverseSortDirection,
        sortBy,
        page: activePage
    })

    const handleChangeSorting = (field: keyof T) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        let filter = getFilter()
        filter.sortBy = field
        filter.reversed = reversed
        handleFilterChange(filter)
    };

    const handleFilterChange = (filter: IFilter<T>) => {
        if (onFilterChange) onFilterChange(filter)
    }

    // Computed
    const itemsPerPage = parseInt(itemsPerPageString ?? '10')

    const displayedCols = columns.filter(column => !column.hidden && column.key != groupBy)

    const firstRegister = (activePage - 1) * itemsPerPage + 1
    const lastRegister = (activePage === Math.ceil(totalRows / itemsPerPage) 
        ? firstRegister + pageRows.length
        : firstRegister + itemsPerPage) - 1

    useEffect(() => {
        handleFilterChange(getFilter())
    }, [])

    useEffect(() => {
        handleSearchChange(debouncedSearch)
    }, [debouncedSearch])

    useEffect(() => {
        if (!rowSelection || rowSelection.selection.length == 0) return
        rowSelection.setSelection(current => current.filter(item => pageRows.find(row => row.id == item)))
    }, [activePage, sortBy, search, itemsPerPage])

    return (
        <Box>
            <Actions 
                search={search}
                setSearch={setSearch}
                itemsPerPageString={itemsPerPageString}
                handleChangeItemsPerPage={handleChangeItemsPerPage}
                pagination={pagination}
                localization={localization}
            />
            <ScrollArea
                styles={{ thumb: { zIndex: 3 } }}
                sx={{ height }}
                onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
            >
                <Table
                    horizontalSpacing="md"
                    verticalSpacing="sm"
                    striped={striped}
                    sx={{ tableLayout: 'fixed', minWidth: 700 }}
                >
                    <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                        <Header
                            displayedCols={displayedCols}
                            reverseSortDirection={reverseSortDirection}
                            numberOfRows={pageRows.length}
                            toggleAll={toggleAll}
                            handleChangeSorting={handleChangeSorting}
                            sortBy={sortBy}
                            rowSelection={rowSelection}
                            localization={localization}
                        />
                    </thead>
                    <tbody>
                        <Body
                            rows={pageRows}
                            displayedCols={displayedCols}
                            rowSelection={rowSelection}
                            toggleRow={toggleRow}
                            localization={localization}
                        />
                    </tbody>
                </Table>
            </ScrollArea>
            <Footer
                pagination={pagination}
                firstRegister={firstRegister}
                lastRegister={lastRegister}
                rowSelection={rowSelection}
                handleChangePage={handleChangePage}
                totalRows={totalRows}
                activePage={activePage}
                localization={localization}
                itemsPerPage={itemsPerPage}
            />
        </Box>
    );
}

export { BaseGrid }