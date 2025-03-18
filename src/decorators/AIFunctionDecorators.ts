interface AIFOptions { }
export const AIF = <T extends (...args: any[]) => any>(options: AIFOptions, func: T) => {
    return (...args: Parameters<T>): ReturnType<T> => {
        return func(...args);
    }
}

