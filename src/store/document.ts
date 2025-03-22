import { defineStore } from 'pinia'
export const documentStore = defineStore('document', () => {
    const document = ref<Documents[]>([{
        title: '默认文档',
        id: useId(),
        sections: []
    }])
    const getDocument = computed(() => document)
    return {
        getDocument
    }
})