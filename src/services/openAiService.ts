import '@/api'
export const openAiService = () => {
    return {
        getModel: AIF({
            name: 'getModel',
            command: 'getModel',
            description: '根据设置中的api地址获取模型列表',
            windowLabel: 'main',
            type: 'remote-api',
            category: 'setting'
        }, () => {
            return Apis.general.get_v1_models()
        }),
    }
};
