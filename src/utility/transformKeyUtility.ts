export function transformKeys<T extends Record<string, any>>(
    data: Record<string, any>, 
    mapping: Record<string, keyof T>
): T {
    const result = {} as T;
    for (const [oldKey, newKey] of Object.entries(mapping)) {
        if (data.hasOwnProperty(oldKey)) {
            result[newKey as keyof T] = data[oldKey];
        }
    }
    return result;
}