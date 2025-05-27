<script setup lang="ts">
const props = defineProps({
  icon: String
});

const emit = defineEmits<{
  (e: "click"): any;
}>();
</script>

<template>
  <div
    class="bg-background flex min-h-9 min-w-9 cursor-pointer items-center justify-center rounded-sm hover:brightness-120 active:brightness-110"
    @click="emit('click')"
  >
    <MdiIcon class="text-primary" :icon="props.icon as any" size="23" />
  </div>
</template>
