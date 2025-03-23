<template>
  <editor-content id="rich-editor" class="select-none" :editor="editor" />
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Placeholder from "@tiptap/extension-placeholder";
const props = defineProps<{
  placeholder?: string;
  disableEnter?: boolean;
}>();
const modelValue = defineModel<string>({ default: "" });
const lineHeight = ref(1.8);
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
    let newText = editor.getText();
    if (props.disableEnter) {
      newText = newText.replace(/\n/g, "");
      if (newText !== editor.getText()) {
        editor.commands.setContent(newText);
      }
    }
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
  @apply select-none;
  outline: none !important;
  caret-color: var(--color-caret);
  overflow: auto;
  display: table;
  flex-direction: column;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: inherit;
  width: 100%;
}

.ProseMirror p {
  line-height: v-bind(lineHeight);
  color: var(--color-textColor-selection-richEditor);
}

.ProseMirror ::selection {
  background: var(--color-bg-selection-richEditor);
}

.ProseMirror p.is-editor-empty:first-child::before {
  color: var(--color-text-placeholder);
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
</style>
