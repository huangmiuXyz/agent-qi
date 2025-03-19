
export const AIFunctionMap = ref(new Map<string, { fn: Function, options: AIFOptions }>())
export const AIF = <T extends (...args: any[]) => any>(options: AIFOptions, func: T) => {
    const fn = (...args: Parameters<T>): ReturnType<T> => {
        return func(...args);
    }
    AIFunctionMap.value.set(options.name, { fn, options })
    return fn
}


export const getAllAIFuntion = () => {
    return Array.from(AIFunctionMap.value.values())
}