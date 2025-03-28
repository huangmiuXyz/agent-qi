<template>
  <Transition name="fade">
    <div
      v-show="aiSelectionBarShow && !aiChatInputShow"
      ref="aiSelectionBarRef"
      class="flex items-center absolute rounded-lg p-1 border"
      :style="{
        left: aiSelectionBarPosition.x + 'px',
        top: aiSelectionBarPosition.y + 'px',
        backgroundColor: 'var(--color-ai-selection-bar)',
        boxShadow: 'var(--shadow-ai-selection-bar)',
        borderColor: 'var(--color-ai-selection-bar-border)',
      }"
    >
      <button
        @click="onAskAI"
        class="text-sm font-medium px-2 py-1 rounded-md transition-colors duration-200 flex items-center cursor-pointer"
        :style="{
          color: 'var(--color-ai-selection-bar-text)',
        }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4 mr-1.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
        Ask AI
      </button>
    </div>
  </Transition>

  <Transition name="fade">
    <UIAIChatInput
      v-if="aiChatInputShow && aiSelectionBarShow"
      class="absolute"
      :style="{
        left: aiSelectionBarPosition.x + 'px',
        top:
          aiSelectionBarPosition.type === 'top'
            ? aiSelectionBarPosition.y - 12 + 'px'
            : aiSelectionBarPosition.y + 'px',
      }"
    />
  </Transition>
</template>

<script lang="ts" setup>
const {
  aiSelectionBarPosition,
  aiSelectionBarShow,
  aiChatInputShow,
  setAiChatInputShow,
} = useAISelectionBar();

const aiSelectionBarRef = useTemplateRef<HTMLDivElement>("aiSelectionBarRef");

onMounted(() => {
  aiSelectionBarRef.value!.addEventListener("mousedown", (e) => {
    e.preventDefault();
  });
});

const onAskAI = () => {
  setAiChatInputShow(true);
  nextTick(() => {
    document.getElementById("ai-chat-input")?.querySelector("input")?.focus();
  });
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
