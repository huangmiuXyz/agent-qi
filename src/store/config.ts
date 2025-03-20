import { defineStore } from 'pinia'
export const settingsStore = defineStore('settings', () => {
    const isDark = ref<boolean>(false)
    const setDark = (value: boolean) => {
        isDark.value = value
    }
    const settings = ref<Record<string, any>>({})
    const getDark = computed(() => isDark)
    return {
        isDark,
        setDark,
        getDark
    }
})