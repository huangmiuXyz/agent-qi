import { getCurrentWindow } from "@tauri-apps/api/window"
import { emit, listen } from "@tauri-apps/api/event"

export const AIFunctionMap = ref(new Map<string, { fn: Function, options: AIFOptions }>())
export const AIF = <T extends (...args: any[]) => any>(
    options: AIFOptions,
    fn: T
): T => {
    AIFunctionMap.value.set(options.name, { fn, options });
    return fn;
};


export const getAllAIFuntion = () => {
    return Array.from(AIFunctionMap.value.values())
}

export const execAIFunction = async <T extends (...args: any[]) => any>(name: string, ...args: Parameters<T>) => {
    const { options, fn } = AIFunctionMap.value.get(name)!
    if (options.windowLabel === getCurrentWindow().label) {
        fn(...args)
    } else {
        await emit(`exec-ai-function-${options.windowLabel}`, { name, args })
    }
}
if (window.__TAURI_OS_PLUGIN_INTERNALS__) {
    listen(`exec-ai-function-${getCurrentWindow().label}`, (event) => {
        const { name, args } = event.payload as { name: string, args: any[] }
        const { fn } = AIFunctionMap.value.get(name)!
        fn(...args)
    })
}