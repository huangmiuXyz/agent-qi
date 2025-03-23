<template>
  <div
    ref="aiSelectionBarRef"
    :class="showBar ? 'fade-in' : 'hidden'"
    class="bg-ai-selection-bar shadow-ai-selection-bar flex items-center absolute w-100 h-10 rounded-md pl-2 transition-all duration-300 opacity-0 transform translate-y-2"
    :style="{
      left: position.x + 'px',
      top: position.y + 'px',
    }"
  >
    <div @click="onAskAI" class="ui-button-ai">Ask AI</div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  position: {
    x: number;
    y: number;
  };
}>();

const showBar = computed(
  () => props.position.x !== 0 && props.position.y !== 0
);

const aiSelectionBarRef = useTemplateRef<HTMLDivElement>("aiSelectionBarRef");

onMounted(() => {
  aiSelectionBarRef.value!.addEventListener("mousedown", (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
});

const onAskAI = () => {
  console.log("ask ai");
};
</script>

<style scoped>
.fade-in {
  opacity: 1 !important;
  transform: translateY(0) !important;
}
.hidden {
  opacity: 0;
  transform: translateY(10px);
  pointer-events: none;
}
</style>
