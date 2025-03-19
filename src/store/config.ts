import { defineStore } from 'pinia'
export const configStore = defineStore('config', () => {
    const isDark = ref<boolean>(false)
    const setDark = (value: boolean) => {
        isDark.value = value
        document.documentElement.classList.toggle("dark", value)
    }
    const getDark = computed(() => isDark)
    return {
        isDark,
        setDark,
        getDark
    }
})