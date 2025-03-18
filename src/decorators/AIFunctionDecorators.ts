interface AIFOptions {
    name: string
    command: string
    description: string
    params?: Record<string, any>
}
export const AIFunctionWeakMap = new WeakMap<{ key: string }, { fn: Function, options: AIFOptions }>()
export const AIFunctionMap = new Map<string, AIFOptions>()
export const AIF = <T extends (...args: any[]) => any>(options: AIFOptions, func: T) => {
    const fn = (...args: Parameters<T>): ReturnType<T> => {
        return func(...args);
    }
    AIFunctionWeakMap.set({ key: options.name }, { fn, options })
    AIFunctionMap.set(options.name, options)
    getAllAIFuntion()
    return fn
}

export const getAIFunction = (command: string) => {
    if (AIFunctionWeakMap.has({ key: command }))
        return AIFunctionWeakMap.get({ key: command })
    return null
}

export const getAllAIFuntion = () => {
    return Object.fromEntries(AIFunctionMap)
}