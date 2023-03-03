import { keys } from '@mantine/utils';

function filterData<T>(data: T[], search: string) {
    const query = search.toLowerCase().trim();
    return data.filter((item) =>
        keys(data[0]).some((key) => {
            let value = item[key]
            return typeof value == 'string' && value.toLowerCase().includes(query)
        })
    );
}
export default filterData