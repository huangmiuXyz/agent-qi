import { defineStore } from 'pinia'
export const configStore = defineStore('config', () => {
    const isDark = ref<boolean>(false)
    const setDark = (value: boolean) => {
        isDark.value = value
    }
    const getDark = computed(() => isDark)
    return {
        isDark,
        setDark,
        getDark
    }
})