<template>
  <!-- 右上角和右下角圆角 -->
  <div
    v-if="!layoutOut.includes(path)"
    class="w-full h-full flex rounded-tr-2xl rounded-br-2xl bg-sidebar"
  >
    <layout-sider-bar />
    <div class="flex flex-col flex-1">
      <layout-title-bar />
      <slot />
    </div>
  </div>
  <slot v-else />
  <UIAISelectionBar :position="aiSelectionBarPosition" />
</template>

<script setup lang="ts">
const router = useRouter();
const layoutOut = ref(["/settings"]);
const path = computed(() => router.currentRoute.value.fullPath);
const { aiSelectionBarPosition } = toRefs(useAISelectionBar());
</script>

<style scoped></style>
