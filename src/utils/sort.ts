import filterData from "./filter";

const sortData = <T>(
    data: T[], 
    payload: { sortBy: keyof T | null; reversed: boolean; search: string }) => 
{
    const { sortBy } = payload;
    
    if (!sortBy) {
        return filterData(data, payload.search);
    }

    return filterData(
        [...data].sort((a, b) => {
            const itemA = a[sortBy]
            const itemB = b[sortBy]
            if(typeof itemA == 'string' && typeof itemB == 'string') {
                if (payload.reversed ) {
                    return itemB.localeCompare(itemA);
                }
    
                return itemA.localeCompare(itemB);
            }
            return 0
        }),
        payload.search
    );
}

export default sortData