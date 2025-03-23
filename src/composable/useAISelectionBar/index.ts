const aiSelectionBarPosition = ref({
    x: 0,
    y: 0,
});
export const useAISelectionBar = () => {

    const setAiSelectionBarPosition = (position: { x: number; y: number }) => {
        aiSelectionBarPosition.value = position;
    };
    return {
        setAiSelectionBarPosition,
        aiSelectionBarPosition
    }
}