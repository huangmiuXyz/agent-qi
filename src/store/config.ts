import { defineStore } from 'pinia'
interface ConfigStore {
    isDark: Readonly<Ref<boolean>>
    setDark: (value: boolean) => void
    getDark: ComputedRef<boolean>
}
export const configStore = defineStore('config', () => {
    const isDark = ref(false)
    const setDark = (value: boolean) => {
        isDark.value = value
        document.documentElement.classList.toggle("dark", value)
    }
    const getDark = computed(() => isDark.value)
    return {
        isDark,
        setDark,
        getDark
    }
})
