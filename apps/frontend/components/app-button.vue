<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: false
  }
});

const emit = defineEmits(["click"]);
</script>

<template>
  <button class="bg-primary rounded-sm p-3 text-white cursor-pointer hover:brightness-120 active:brightness-80 outline-none" @click="emit('click')">
    {{ props.label }}
  </button>
</template>
