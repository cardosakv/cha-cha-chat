<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: false
  }
});
</script>

<template>
  <button
    class="bg-primary rounded-sm p-3 text-white cursor-pointer hover:brightness-120 active:brightness-80 outline-none"
  >
    {{ props.label }}
  </button>
</template>
