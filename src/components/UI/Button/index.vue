<template>
  <n-button :render-icon="icon" v-bind="$attrs"></n-button>
</template>

<script setup lang="ts">
import * as antdIcon from "@vicons/antd";

const Icons = { ...antdIcon };
const props = defineProps<{
  iconName: IconType;
}>();

// 动态获取图标组件
const icon = computed(() => {
  const IconComponent = Icons[props.iconName];
  return () => h(IconComponent);
});
</script>

<style scoped></style>
