<template>
  <n-button :render-icon="icon" v-bind="$attrs">
    <slot />
  </n-button>
</template>

<script setup lang="ts">
import * as antdIcon from "@vicons/antd";

const Icons = { ...antdIcon };
const props = defineProps<{
  iconName?: IconType;
}>();

const icon = computed(() => {
  if (!props.iconName) return;
  const IconComponent = Icons[props.iconName];
  return () => h(IconComponent);
});
</script>

<style scoped></style>
