<template>
  <n-button
    :render-icon="icon"
    v-bind="$attrs"
    :style="{ fontSize: props.fontSize }"
  >
    <slot />
  </n-button>
</template>

<script setup lang="ts">
import * as antdIcon from "@vicons/antd";
import * as materialIcon from "@vicons/material";
import * as carbonIcon from "@vicons/carbon";
import * as tablerIcon from "@vicons/tabler";
import { ButtonProps } from "naive-ui";
const Icons = { ...antdIcon, ...materialIcon, ...carbonIcon, ...tablerIcon };
interface Props extends /* @vue-ignore */ ButtonProps {
  iconName?: IconType;
  fontSize?: string;
}
const props = defineProps<Props>();

const icon = computed(() => {
  if (!props.iconName) return;
  const IconComponent = Icons[props.iconName];
  return () => h(IconComponent);
});
</script>

<style scoped></style>
