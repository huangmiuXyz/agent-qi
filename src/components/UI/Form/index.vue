<template>
  <NForm :label-placement :model="modal">
    <NFormItem
      v-for="(item, index) in schemas"
      :label="item.label"
      :path="item.field"
      :feedback-class="index === schemas.length - 1 ? 'hidden' : ''"
    >
      <NInput
        size="small"
        v-if="item.component === 'input'"
        v-model:value="modal![item.field]"
        :placeholder="item.placeholder"
      />
    </NFormItem>
  </NForm>
</template>

<script setup lang="ts">
import { LabelPlacement } from "naive-ui/es/form/src/interface";

defineProps<{
  schemas: FormSchema<SettingsFormKey>[];
  labelPlacement: LabelPlacement;
}>();
const modal = defineModel<Record<string, any> | undefined>();
</script>

<style scoped></style>
