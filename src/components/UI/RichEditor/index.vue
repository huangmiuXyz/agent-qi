<template>
  <editor-content class="select-none" :editor="editor" />
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Placeholder from "@tiptap/extension-placeholder";
import { Mark } from "@tiptap/core";

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

const Span = Mark.create({
  name: "span",
  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (node) => {
          if (typeof node === "string") return {};
          return {
            class: node.getAttribute("class"),
          };
        },
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["span", { ...HTMLAttributes, class: "select-data" }, 0];
  },
});

const editor = useEditor({
  content: modelValue.value,
  extensions: [
    Document,
    Paragraph,
    Text,
    Span,
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
      editor
        .chain()
        .command(({ tr }) => {
          const mark = editor.schema.marks.span;
          if (!mark) return false;
          editor.state.doc.descendants((node, pos) => {
            if (node.isText) {
              tr.removeMark(pos, pos + node.nodeSize, mark);
            }
          });
          return true;
        })
        .run();
      return;
    }

    const { from, to } = editor.state.selection;
    editor
      .chain()
      .command(({ tr }) => {
        const mark = editor.schema.marks.span;
        if (!mark) return false;

        editor.state.doc.descendants((node, pos) => {
          if (node.isText) {
            tr.removeMark(pos, pos + node.nodeSize, mark);
          }
        });

        tr.addMark(from, to, mark.create());
        return true;
      })
      .run();
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

    if (!selectionText) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const selectDatas = Array.from(document.querySelectorAll(".select-data"));
    const firstRect = selectDatas[0].getBoundingClientRect();
    const lastRect =
      selectDatas[selectDatas.length - 1].getBoundingClientRect();
    if (firstRect.top - 50 < 50) {
      setAiSelectionBarPosition({
        y: lastRect.bottom + 2,
        x: firstRect.left,
        type: "bottom",
      });
    } else {
      setAiSelectionBarPosition({
        y: firstRect.top - 40,
        x: firstRect.left,
        type: "top",
      });
    }
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
  wrapSelectionWithSpan: () => {
    if (!editor.value) return;

    const { from, to } = editor.value.state.selection;
    if (from === to) return;

    editor.value
      .chain()
      .command(({ tr }) => {
        const mark = editor.value?.schema.marks.span;
        if (!mark) return false;
        tr.addMark(from, to, mark.create());
        return true;
      })
      .run();
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
.select-data {
  background-color: var(--color-bg-selection-richEditor);
}
.ProseMirror p {
  line-height: v-bind(lineHeight);
  color: var(--color-textColor-selection-richEditor);
}

.ProseMirror ::selection {
  background: transparent;
}

.ProseMirror p.is-editor-empty:first-child::before {
  color: var(--color-text-placeholder);
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
</style>
