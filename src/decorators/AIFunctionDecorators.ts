interface AIFOptions {
    command: string
    description: string
    params: Record<string, any>
}
export const AIFunctionMap = new Map<string, Function>()
export const AIF = <T extends (...args: any[]) => any>(options: AIFOptions, func: T) => {

    const fn = (...args: Parameters<T>): ReturnType<T> => {
        return func(...args);
    }
    AIFunctionMap.set(options.command, fn)
    return fn
}

export const getAIFunction = (command: string) => {
    return AIFunctionMap.get(command)
}