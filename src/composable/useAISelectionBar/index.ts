const aiSelectionBarPosition = ref({
    x: 0,
    y: 0,
    type: "top",
});
const aiSelectionBarShow = ref(false);
const aiChatInputShow = ref(false);
export const useAISelectionBar = () => {

    const setAiSelectionBarPosition = async (position: { x: number; y: number; type: "top" | "bottom" }) => {
        aiSelectionBarPosition.value = position;
        await nextTick()
        setAiSelectionBarShow(true);
    };

    const setAiSelectionBarShow = (visible: boolean) => {
        aiSelectionBarShow.value = visible;
        if (!visible) {
            aiChatInputShow.value = false;
        }
    };

    const setAiChatInputShow = (visible: boolean) => {
        aiChatInputShow.value = visible;
    };

    return {
        setAiSelectionBarPosition,
        aiSelectionBarPosition,
        setAiSelectionBarShow,
        aiSelectionBarShow,
        setAiChatInputShow,
        aiChatInputShow
    }
}