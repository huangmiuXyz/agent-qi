export const openAiService = () => {
    return {
        getModel: () => {
            return Apis.general.get_v1_models()
        },
    }
};
