<script setup lang="ts">
const input = defineModel<string>();
const emit = defineEmits<{
  (e: "keyEnter"): any;
}>();

const props = defineProps({
  error: String
});
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <input
      class="bg-grey-dark placeholder-grey-medium w-full rounded-sm p-3 text-center text-base text-white outline-none hover:brightness-120"
      v-model="input"
      @keydown.enter="emit('keyEnter')"
      placeholder="Input here..."
      type="text"
    />
    <div class="mt-1 text-center text-xs font-light text-red-400">{{ props.error }}</div>
  </div>
</template>
