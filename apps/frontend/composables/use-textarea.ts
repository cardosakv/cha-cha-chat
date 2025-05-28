import type { ModelRef } from "vue";

export const useTextarea = (textareaRef: Ref<HTMLTextAreaElement | null>, message: ModelRef<string | undefined>) => {
  function adjustHeight() {
    const el = textareaRef.value;
    if (el) {
      if (message.value?.trim()) {
        el.style.height = "auto";
        el.style.height = el.scrollHeight + "px";
      } else {
        el.style.height = "20px";
      }
    }
  }

  watch(message, () => adjustHeight());

  return {
    adjustHeight
  };
};
