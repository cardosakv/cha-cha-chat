<script setup lang="ts">
const props = defineProps({
  isOwn: Boolean,
  media: String
});
</script>

<template>
  <div :class="['flex rounded-xl p-2 text-sm text-white', { 'bg-primary': props.isOwn, 'bg-grey-dark': !props.isOwn }]">
    <img :src="props.media" />
  </div>
</template>
"
