<template>
  <NForm :label-placement :model="modal">
    <NFormItem v-for="item in schemas" :label="item.label" :path="item.field">
      <template #feedback>
        <component :is="item.feedbackRender" />
      </template>
      <div class="flex flex-col w-full">
        <UIInput
          :size="item.size"
          v-if="item.component === 'input'"
          v-model:value="modal![item.field]"
          :placeholder="item.placeholder"
          :type="item.type"
        />
        <UISelect
          :size="item.size"
          v-if="item.component === 'select'"
          v-model:value="modal![item.field]"
          :options="item.options"
          :placeholder="item.placeholder"
          @focus="item.onFocus"
          :loading="item.loading"
          :filterable="item.filterable"
          :tag="item.tag"
          :multiple="item.multiple"
        />
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
