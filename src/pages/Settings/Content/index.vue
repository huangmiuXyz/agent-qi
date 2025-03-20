<template>
  <div class="bg-settings-sidebar-content flex-1">
    <div class="mt-6">
      <UIForm v-bind="{ ...Form[getActiveMenu.value] }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsMenu } from "../hooks/useSettingsMenu";
const { getActiveMenu } = useSettingsMenu();
const Form: Record<SettingsFormKey, FormProps> = {
  function: { schemas: [] },
  general: { schemas: [] },
  aiSetting: { schemas: [] },
};
</script>

<style scoped></style>
