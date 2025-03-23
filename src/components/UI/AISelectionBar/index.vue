<template>
  <div
    v-if="position.x && position.y"
    class="bg-ai-selection-bar shadow-ai-selection-bar flex items-center absolute w-100 h-10 rounded-md p-2"
    :style="{
      left: position.x + 'px',
      top: position.y + 'px',
    }"
  >
    <UIButton quaternary>AI ask</UIButton>
  </div>
</template>
<script lang="ts" setup>
defineProps<{
  position: {
    x: number;
    y: number;
  };
}>();
</script>
<style></style>
