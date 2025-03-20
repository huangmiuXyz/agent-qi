<template>
  <div class="bg-settings-sidebar-content flex-1">
    <div class="mt-6">
      <UIForm v-bind="{ ...Form[getActiveMenu.value] }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsMenu } from "~/Settings/composable/useSettingsMenu";
const { getActiveMenu } = useSettingsMenu();
settingsStore;
const Form = {
  function: { schemas: [] },
  general: { schemas: [] },
  aiSetting: { schemas: [] },
} as const satisfies Record<SettingsFormKey, FormProps>;
</script>

<style scoped></style>
