import type { ModelRef } from "vue";

export const useTextarea = (textareaRef: Ref<HTMLTextAreaElement | null>, message: ModelRef<string | undefined>) => {
  function adjustHeight() {
    const el = textareaRef.value;
    if (el) {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    }
  }

  watch(message, () => adjustHeight());

  return {
    adjustHeight
  };
};
