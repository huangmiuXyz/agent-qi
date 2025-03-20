<template>
  <div
    class="text-settings-sidebar-menu-item-text rounded-md flex items-center gap-2 w-full h-9 box-border p-2 hover:bg-settings-sidebar-menu-item-active cursor-pointer"
    :class="{
      'bg-settings-sidebar-menu-item-active': active,
    }"
  >
    <UIButton text :icon-name="menu.icon" />
    <span>{{ menu.name }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  active: boolean;
  menu: SettingsMenu;
}
defineProps<Props>();
</script>

<style scoped></style>
