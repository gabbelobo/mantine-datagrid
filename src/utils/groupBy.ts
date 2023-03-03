export default function groupByFn<T extends { [key: string]: any }>(arr: T[], key: string) {
    return arr.reduce<Record<string, T[]>>(function (prev, row: T) {
        const groupKey = row[key];
        const group = prev[groupKey] || [];
        group.push(row);
        return { ...prev, [groupKey]: group };
    }, {});
};