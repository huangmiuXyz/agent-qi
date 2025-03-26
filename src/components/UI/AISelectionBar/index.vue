<template>
  <Transition name="fade">
    <div v-show="aiSelectionBarShow" ref="aiSelectionBarRef"
      class="bg-ai-selection-bar shadow-ai-selection-bar flex items-center absolute w-100 h-10 rounded-lg pl-2" :style="{
        left: aiSelectionBarPosition.x + 'px',
        top: aiSelectionBarPosition.y + 'px',
      }">
      <div @click="onAskAI" class="ui-button-ai">Ask AI</div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
const { aiSelectionBarPosition, aiSelectionBarShow } =
  toRefs(useAISelectionBar());

const aiSelectionBarRef = useTemplateRef<HTMLDivElement>("aiSelectionBarRef");

onMounted(() => {
  aiSelectionBarRef.value!.addEventListener("mousedown", (e) => {
    e.preventDefault();
  });
});

const onAskAI = () => {
  console.log("ask ai");
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
