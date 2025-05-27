<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useTextarea } from "~/composables/use-textarea";

const message = defineModel<string>();
const textareaRef = ref<HTMLTextAreaElement | null>(null);

const { adjustHeight } = useTextarea(textareaRef, message);

onMounted(() => {
  adjustHeight();
});
</script>

<template>
  <div class="bg-grey-dark w-full rounded-sm p-1.5 pb-0.5 hover:brightness-120">
    <textarea
      class="placeholder-grey-medium box-border max-h-20 w-full resize-none overflow-y-auto text-left text-sm font-light text-white outline-none [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-400"
      v-model="message"
      rows="1"
      placeholder="Aa"
      ref="textareaRef"
      @input="adjustHeight"
    />
  </div>
</template>
