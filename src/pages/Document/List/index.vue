<template>
  <div
    class="flex-1/6 max-w-50 min-w-50 p-2 h-full rounded-xl bg-document-list select-none"
  >
    <UIInput size="small" v-model="search" placeholder="搜索章节">
      <template #suffix>
        <UIButton size="small" text @click="newSection()" icon-name="Add" />
      </template>
    </UIInput>
    <n-divider />
    <div
      class="flex flex-col gap-1 overflow-auto h-[calc(100vh-7rem)] mt-2"
      ref="sectionListRef"
      v-if="
        document[nowDocumentIndex].sections.length && nowSectionIndex !== -1
      "
    >
      <n-virtual-list
        :item-size="28"
        ref="virtualListRef"
        :items="document[nowDocumentIndex].sections"
      >
        <template #default="{ item }">
          <div
            :class="{ 'bg-document-list-active': nowSectionId === item.id }"
            class="cursor-pointer hover:bg-document-list-active rounded-md mt-1"
            @click="setSectionId(item.id)"
            @dblclick="sectionsTitleReadonly = false"
            :key="item.id"
          >
            <UIInput
              no-style
              @blur="sectionsTitleReadonly = true"
              :readonly="sectionsTitleReadonly"
              size="small"
              v-model:value="item.title"
              placeholder="无章节标题"
            />
          </div>
        </template>
      </n-virtual-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import UIInput from "@/components/UI/Input/index.vue";
import { NVirtualList } from "naive-ui";
const virtualListRef =
  useTemplateRef<InstanceType<typeof NVirtualList>>("virtualListRef");
const sectionListRef = useTemplateRef<HTMLDivElement>("sectionListRef");
const search = ref("");
const { nowDocumentIndex, nowSectionIndex, document, nowSectionId } =
  storeToRefs(documentStore());
const { addSection, setNowSectionId } = documentStore();
const newSection = async () => {
  addSection("新章节");
  sectionsTitleReadonly.value = false;
  await nextTick();
  virtualListRef.value?.scrollTo({ position: "bottom" });
  setTimeout(() => {
    Array.from(sectionListRef.value?.querySelectorAll("input")!)
      .at(-1)
      ?.focus();
  }, 100);
};
const sectionsTitleReadonly = ref(true);
const emit = defineEmits<{
  (e: "change-section"): void;
}>();
const setSectionId = (sectionId: string) => {
  setNowSectionId(sectionId);
  emit("change-section");
};
</script>

<style scoped></style>
