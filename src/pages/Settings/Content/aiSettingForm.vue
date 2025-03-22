<template>
  <UIForm
    v-if="item.title === 'API 设置'"
    class="bg-form p-4 rounded-lg"
    :schemas="item.schemas as unknown as FormSchema<SettingsFormKey>[]"
    label-placement="left"
    v-model="settings.aiSetting"
  />
  <UIForm
    v-else
    class="bg-form p-4 rounded-lg"
    :schemas="item.schemas as unknown as FormSchema<SettingsFormKey>[]"
    label-placement="left"
    v-model="settings.aiSetting.value[nowProvidesFormIndex]"
  />
</template>
<script setup lang="ts">
defineProps<{
  item: FormProps;
}>();
const { settings } = settingsStore();
const nowProvidesFormIndex = computed(() => {
  return settings.aiSetting.value.findIndex(
    (ai) => ai.PROVIDES === settings.aiSetting.nowProvides
  );
});
</script>
