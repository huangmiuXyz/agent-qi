<template>
  <n-button :render-icon="icon" v-bind="$attrs">
    <slot />
  </n-button>
</template>

<script setup lang="ts">
import * as antdIcon from "@vicons/antd";
import * as materialIcon from "@vicons/material";
import * as carbonIcon from "@vicons/carbon";
import * as tablerIcon from "@vicons/tabler";
const Icons = { ...antdIcon, ...materialIcon, ...carbonIcon, ...tablerIcon };
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
