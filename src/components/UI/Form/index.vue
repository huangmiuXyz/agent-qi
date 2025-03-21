<template>
  <NForm :label-placement :model="modal" :show-feedback="false">
    <NFormItem
      v-for="(item, index) in schemas"
      :label="item.label"
      :path="item.field"
      :feedback-class="index === schemas.length - 1 ? 'hidden' : ''"
    >
      <div class="flex flex-col w-full">
        <NInput
          :size="item.size"
          v-if="item.component === 'input'"
          v-model:value="modal![item.field]"
          :placeholder="item.placeholder"
        />
        <NSelect
          :size="item.size"
          v-if="item.component === 'select'"
          v-model:value="modal![item.field]"
          :options="item.options"
          :placeholder="item.placeholder"
        />
        <div v-if="item.feedbackRender" class="h-8 w-full">
          <component :is="item.feedbackRender" />
        </div>
      </div>
    </NFormItem>
  </NForm>
</template>

<script setup lang="ts">
import { LabelPlacement } from "naive-ui/es/form/src/interface";
import { VNode } from "vue";

defineProps<{
  schemas: FormSchema<SettingsFormKey>[];
  labelPlacement: LabelPlacement;
  feedbackRender?: () => VNode;
}>();
const modal = defineModel<Record<string, any> | undefined>();
</script>

<style scoped></style>
