<template>
  <div :class="{ 'reset-naive-button': props.noStyle }" @click="handleClick">
    <n-button
      :render-icon="icon"
      v-bind="$attrs"
      :style="{ fontSize: props.fontSize }"
    >
      <slot />
    </n-button>
  </div>
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
  noStyle?: boolean;
}
const props = defineProps<Props>();

const icon = computed(() => {
  if (!props.iconName) return;
  const IconComponent = Icons[props.iconName];
  return () => h(IconComponent);
});
const emit = defineEmits<{
  (e: "click"): void;
}>();
const handleClick = () => {
  emit("click");
};
</script>

<style>
.reset-naive-button .n-button {
  --n-box-shadow-focus: none !important;
  --n-box-shadow-focus-error: none !important;
  --n-box-shadow-hover: none !important;
  --n-box-shadow-pressed: none !important;
  --n-border: none !important;
  --n-border-hover: none !important;
  --n-border-active: none !important;
  --n-border-pressed: none !important;
  --n-border-focus: none !important;
  --n-border-disabled: none !important;
  --n-ripple-color: transparent !important;
  background-color: transparent !important;
}
</style>
