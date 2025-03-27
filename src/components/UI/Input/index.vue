<template>
  <div :class="{ 'reset-naive-input': noStyle }">
    <n-input v-bind="$attrs">
      <template #suffix>
        <slot name="suffix" />
      </template>
    </n-input>
  </div>
</template>

<script setup lang="ts">
import { NInput } from "naive-ui";
defineProps<{
  noStyle?: boolean;
}>();
const inputRef = useTemplateRef<InstanceType<typeof NInput>>("inputRef");
defineExpose({
  focus: () => {
    inputRef.value?.focus();
  },
  blur: () => {
    inputRef.value?.blur();
  },
});
</script>

<style>
.reset-naive-input .n-input {
  --n-box-shadow-focus: none !important;
  --n-box-shadow-focus-error: none !important;
  --n-box-shadow-hover: none !important;
  --n-border: none !important;
  --n-border-hover: none !important;
  --n-border-focus: none !important;
  --n-border-disabled: none !important;
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
