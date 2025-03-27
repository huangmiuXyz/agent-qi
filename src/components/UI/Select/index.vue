<template>
  <div :class="{ 'reset-naive-select-input': noStyle }">
    <n-select v-bind="$attrs" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  noStyle?: boolean;
}>();
</script>

<style>
.reset-naive-select-input .n-base-selection,
.reset-naive-select-input .n-base-selection--focus {
  --n-box-shadow-focus: none !important;
  --n-box-shadow-focus-error: none !important;
  --n-box-shadow-hover: none !important;
  --n-box-shadow-active: none !important;
  --n-border: none !important;
  --n-border-hover: none !important;
  --n-border-focus: none !important;
  --n-border-disabled: none !important;
  --n-border-active: none !important;
  background-color: transparent !important;
}

.cursor-pointer .n-input input,
.cursor-pointer .n-input__textarea,
.cursor-pointer .n-input__wrapper,
.cursor-pointer .n-input__border,
.cursor-pointer .n-input__state-border {
  cursor: pointer !important;
}
</style>
