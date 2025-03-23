<template>
  <n-input v-bind="$attrs" ref="inputRef">
    <template #suffix>
      <slot name="suffix" />
    </template>
  </n-input>
</template>

<script setup lang="ts">
import { NInput } from "naive-ui";

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

<style></style>
