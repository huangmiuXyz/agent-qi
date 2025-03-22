import { defineStore } from 'pinia'
export const documentStore = defineStore('document', () => {
    const document = ref<Documents[]>([{
        title: '默认文档',
        id: 1,
        sections: []
    }])
    const nowDocumentId = ref<DocumentId>(1)
    const getNowDocument = computed(() => document.value.find(item => item.id === nowDocumentId.value))
    const getDocument = computed(() => document)
    const addSection = (title: string) => {
        const index = document.value.findIndex(item => item.id === nowDocumentId.value)
        if (index !== -1) {
            document.value[index].sections.push({
                title,
                id: useId(),
                content: '',
                create: new Date(),
                update: new Date()
            })
        }
    }
    return {
        getDocument,
        nowDocumentId,
        getNowDocument,
        addSection,
        document
    }
})