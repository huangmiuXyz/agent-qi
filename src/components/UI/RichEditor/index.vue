<template>
  <editor-content id="rich-editor" :editor="editor" />
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Placeholder from "@tiptap/extension-placeholder";
const props = defineProps<{
  placeholder?: string;
}>();
const modelValue = defineModel<string>({ default: "" });

const editor = useEditor({
  content: modelValue.value,
  extensions: [
    Document,
    Paragraph,
    Text,
    Placeholder.configure({
      placeholder: props.placeholder || "开始输入...",
    }),
  ],
  editable: true,
  injectCSS: false,
  onUpdate: ({ editor }) => {
    const newText = editor.getText();
    if (newText !== modelValue.value) {
      modelValue.value = newText;
    }
  },
  autofocus: true,
});

watch(modelValue, (newContent) => {
  if (editor.value && editor.value.getText() !== newContent) {
    editor.value.commands.setContent(newContent, false);
  }
});
</script>

<style>
.ProseMirror {
  outline: none !important;
  caret-color: var(--color-caret);
  overflow: auto;
  display: flex;
  flex-direction: column;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: inherit;
  width: 100%;
}

.ProseMirror p {
  margin: 0;
  line-height: 1.5;
}

.ProseMirror p.is-editor-empty:first-child::before {
  color: var(--color-text-placeholder);
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
</style>
