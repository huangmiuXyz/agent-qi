<template>
  <a-button :icon="icon" v-bind="$attrs"></a-button>
</template>

<script setup lang="ts">
import { h, computed } from "vue";
import * as Icons from "@ant-design/icons-vue";

const props = defineProps<{
  iconName: IconType;
}>();

// 动态获取图标组件
const icon = computed(() => {
  const IconComponent = Icons[props.iconName];
  return h(IconComponent);
});
</script>

<style scoped></style>
