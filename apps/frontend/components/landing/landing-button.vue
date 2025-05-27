<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: false
  }
});

const emit = defineEmits<{
  (e: "click"): any;
}>();
</script>

<template>
  <button
    class="bg-primary cursor-pointer rounded-sm p-3 text-white outline-none hover:brightness-120 active:brightness-80"
    @click="emit('click')"
  >
    {{ props.label }}
  </button>
</template>
