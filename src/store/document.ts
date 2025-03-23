import { defineStore } from 'pinia'
export const documentStore = defineStore('document', () => {
    const document = ref<Documents[]>([{
        title: '默认文档',
        id: 1,
        sections: []
    }])
    const nowDocumentId = ref<DocumentId>(1)
    const nowSectionId = ref<SectionId>('')
    const getNowDocument = computed(() => document.value.find(item => item.id === nowDocumentId.value))
    const getDocument = computed(() => document)
    const nowDocumentIndex = computed(() => document.value.findIndex(item => item.id === nowDocumentId.value))
    const nowSectionIndex = computed(() => getNowDocument.value?.sections.findIndex(item => item.id === nowSectionId.value))
    const addSection = (title: string) => {
        const index = document.value.findIndex(item => item.id === nowDocumentId.value)
        if (index !== -1) {
            const sectionId = `id-${useTimestamp().value}`
            document.value[index].sections.push({
                title,
                id: sectionId,
                content: '',
                create: new Date(),
                update: new Date()
            })
            nowSectionId.value = sectionId
        }
    }
    return {
        getDocument,
        getNowDocument,
        addSection,
        nowDocumentIndex,
        nowSectionIndex,
        document,
        nowSectionId
    }
})