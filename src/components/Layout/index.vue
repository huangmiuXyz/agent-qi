<template>
  <!-- 右上角和右下角圆角 -->
  <div class="w-full h-full flex rounded-tr-2xl rounded-br-2xl">
    <sider-bar />
    <nav-bar />
    <div class="flex-1">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
