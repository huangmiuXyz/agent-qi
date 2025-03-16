<template>
  <editor-content id="rich-editor" class="h-full" :editor="editor" />
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";

const modelValue = defineModel<string>({ default: "" });
const editor = useEditor({
  content: modelValue.value,
  extensions: [Document, Paragraph, Text],
  editable: true,
  injectCSS: false,
  onUpdate: ({ editor }) => {
    modelValue.value = editor.getText();
  },
});

watch(
  modelValue,
  (newContent) => {
    if (editor.value && editor.value.getText() !== newContent) {
      editor.value.commands.setContent(newContent);
    }
  },
  { immediate: true }
);
onMounted(() => {
  editor.value?.commands.setContent(modelValue.value);
});
</script>

<style>
.ProseMirror {
  outline: none !important;
  caret-color: var(--color-caret);
  height: 100%;
  min-height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: inherit;
}
.ProseMirror ::selection {
  background-color: var(--color-bg-selection-richEditor);
  color: var(--color-textColor-selection-richEditor);
}
/* 禁用粘贴时的富文本格式 */
.ProseMirror p {
  margin: 0;
}
</style>
