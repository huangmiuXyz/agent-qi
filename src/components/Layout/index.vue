<template>
  <!-- 右上角和右下角圆角 -->
  <div class="w-full h-full flex rounded-tr-2xl rounded-br-2xl">
    <layout-sider-bar />
    <div class="flex flex-col flex-1">
      <layout-title-bar />
      <div
        class="max-sm:p-0 flex-1 bg-pages rounded-tl-2xl flex justify-center p-3 pb-0"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
