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
    const getAllDocument = AIF({
        name: '获取所有文档',
        command: 'getAllDocument',
        description: '获取所有文档,不包含小说的内容',
        windowLabel: 'main',
        type: 'local-function',
        category: 'document'
    }, () => document.value.map(item => {
        return {
            ...item,
            sections: item.sections.map(item => {
                const { content, ...rest } = item
                return rest
            })
        }
    }))
    const getOneDocument = AIF({
        name: '获取单个文档',
        command: 'getOneDocument',
        description: '获取单个文档,包含小说的内容',
        windowLabel: 'main',
        type: 'local-function',
        category: 'document'
    }, (id: DocumentId) => document.value.find(item => item.id === id))
    const addSection = AIF({
        name: '添加章节',
        command: 'addSection',
        description: '添加章节',
        windowLabel: 'main',
        type: 'local-function',
        category: 'document',
        params: [
            {
                type: 'string',
                description: '章节标题',
                required: true
            }
        ]
    }, (title: string) => {
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
    })
    const setNowSectionId = AIF({
        name: '设置当前章节ID',
        command: 'setNowSectionId',
        description: ``,
        windowLabel: 'main',
        type: 'local-function',
        category: 'document',
        params: [
            {
                type: 'string',
                description: `当前章节ID,切换到章节，只能从章节列表中选择id，以下是章节列表${getNowDocument.value?.sections.map(item => ({ id: item.id, title: item.title })).join(', ')}`,
                required: true
            }
        ]
    }, (id: SectionId) => {
        nowSectionId.value = id
    });
    const deleteSection = AIF({
        name: '删除章节',
        command: 'deleteSection',
        description: '删除章节',
        windowLabel: 'main',
        type: 'local-function',
        category: 'document',
        params: [
            {
                type: 'string',
                description: '文档ID',
                required: true
            },
            {
                type: 'string',
                description: '章节ID',
                required: true
            }
        ]
    }, (dId: DocumentId, sId: SectionId) => {
        const index = document.value.findIndex(item => item.id === dId)
        if (index !== -1) {
            const sectionIndex = document.value[index].sections.findIndex(item => item.id === sId)
            if (sectionIndex !== -1) {
                document.value[index].sections.splice(sectionIndex, 1)
            }
        }
    })
    return {
        deleteSection,
        getOneDocument,
        getAllDocument,
        getDocument,
        getNowDocument,
        addSection,
        nowDocumentIndex,
        nowSectionIndex,
        document,
        nowSectionId,
        setNowSectionId
    }
})