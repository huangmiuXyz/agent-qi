<template>
  <editor-content class="select-none" :editor="editor" />
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Placeholder from "@tiptap/extension-placeholder";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useAISelectionBar } from "@/composable";

interface Props {
  placeholder?: string;
  disableEnter?: boolean;
  id: string;
}

const props = defineProps<Props>();
const modelValue = defineModel<string | Object>({ default: "" });
const lineHeight = ref(1.8);
const { setAiSelectionBarPosition, setAiSelectionBarShow } =
  useAISelectionBar();

const defaultPlaceholder = computed(() => props.placeholder || "开始输入...");

const editor = useEditor({
  content: modelValue.value,
  extensions: [
    Document,
    Paragraph,
    Text,
    Placeholder.configure({
      placeholder: defaultPlaceholder.value,
    }),
  ],
  editable: true,
  injectCSS: false,
  onSelectionUpdate: ({ editor }) => {
    const selectionText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to
    );

    if (!selectionText) {
      resetAiSelectionBarPosition();
    }
  },
  onUpdate: ({ editor }) => {
    updateModelValue(editor);
  },
  autofocus: true,
});

const resetAiSelectionBarPosition = () => {
  setAiSelectionBarShow(false);
};

const updateModelValue = (editor: any) => {
  const newText = editor.getText();
  const newJSON = editor.getJSON();

  if (props.disableEnter) {
    const textWithoutNewlines = newText.replace(/\n/g, "");
    modelValue.value = textWithoutNewlines;
    return;
  }

  if (newJSON !== modelValue.value) {
    modelValue.value = newJSON;
  }
};

const setAiSelectionBarPositionHandler = () => {
  requestAnimationFrame(() => {
    if (!editor.value) return;

    const selectionText = editor.value.state.doc.textBetween(
      editor.value.state.selection.from,
      editor.value.state.selection.to
    );

    if (!selectionText) {
      resetAiSelectionBarPosition();
      return;
    }

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const yPosition = rect.top - 50 < 50 ? rect.bottom : rect.top - 55;

    setAiSelectionBarPosition({
      y: yPosition,
      x: rect.left,
    });
  });
};
onMounted(() => {
  if (!editor.value) return;
  const tiptapContainer = document.querySelector(".tiptap-container");
  if (!tiptapContainer) return;
  tiptapContainer.addEventListener("mouseup", setAiSelectionBarPositionHandler);
  tiptapContainer.addEventListener("scroll", setAiSelectionBarPositionHandler);
});

onBeforeUnmount(() => {
  const tiptapContainer = document.querySelector(".tiptap-container");
  if (!tiptapContainer) return;

  tiptapContainer.removeEventListener(
    "scroll",
    setAiSelectionBarPositionHandler
  );
  tiptapContainer.removeEventListener(
    "mouseup",
    setAiSelectionBarPositionHandler
  );
});
defineExpose({
  setContent: (content: string) => {
    editor.value?.commands.setContent(content, false);
  },
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
