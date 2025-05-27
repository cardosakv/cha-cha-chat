<script setup lang="ts">
const input = defineModel<string>();
const emit = defineEmits<{
  (e: "keyEnter"): any;
}>();
</script>

<template>
  <input
    class="bg-grey-dark placeholder-grey-medium rounded-sm p-3 text-center text-base text-white outline-none hover:brightness-120"
    v-model="input"
    @keydown.enter="emit('keyEnter')"
    placeholder="Input here..."
    type="text"
  />
</template>
