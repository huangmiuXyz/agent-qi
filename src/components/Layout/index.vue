<template>
  <!-- 右上角和右下角圆角 -->
  <div class="w-full h-full flex rounded-tr-2xl rounded-br-2xl">
    <sider-bar />
    <div class="flex flex-col flex-1">
      <title-bar />
      <div class="flex-1 bg-pages rounded-tl-2xl flex">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
