export const isFunction = (value: unknown): value is (...args: any[]) => any =>
    typeof value === 'function';
export const callFunction = (value: unknown) => {
    if (isFunction(value)) {
        return value()
    }
    return value
}