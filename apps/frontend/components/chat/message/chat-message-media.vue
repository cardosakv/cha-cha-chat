<script setup lang="ts">
const props = defineProps({
  isOwn: Boolean,
  media: String
});
</script>

<template>
  <div
    :class="[
      'flex max-w-80 rounded-xl p-2 text-sm text-white',
      { 'bg-primary': props.isOwn, 'bg-grey-dark': !props.isOwn }
    ]"
  >
    <img class="rounded-lg" :src="props.media" alt="Sent by user" />
  </div>
</template>
"
