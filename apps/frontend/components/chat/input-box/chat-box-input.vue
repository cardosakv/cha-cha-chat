<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useTextarea } from "~/composables/use-textarea";

const emit = defineEmits<{
  (e: "keydownEnter"): any;
}>();

const message = defineModel<string>();
const textareaRef = ref<HTMLTextAreaElement | null>(null);

const { adjustHeight } = useTextarea(textareaRef, message);

function onKeyDown(event: KeyboardEvent) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    emit("keydownEnter");
  }
}

onMounted(() => {
  adjustHeight();
});
</script>

<template>
  <div class="bg-grey-dark mr-2 ml-2 w-full rounded-sm p-1.5 pb-0.5 hover:brightness-120">
    <textarea
      class="placeholder-grey-medium custom-scroll box-border max-h-20 w-full resize-none overflow-y-auto text-left text-sm font-light text-white outline-none"
      v-model="message"
      rows="1"
      placeholder="Aa"
      ref="textareaRef"
      @input="adjustHeight"
      @keydown="onKeyDown"
    />
  </div>
</template>
