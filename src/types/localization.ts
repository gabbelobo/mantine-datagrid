interface IPaginate {
    next: string,
    previous: string,
    first: string,
    last: string
}

interface IAria {
    sortAscending: string,
    sortDescending: string
}

interface ILocalization {
    emptyTable: string,
    info: string,
    infoSelected: string,
    itemsPerPage: string,
    loading: string,
    search: string,
    paginate: IPaginate,
    aria: IAria
}

export type { ILocalization }