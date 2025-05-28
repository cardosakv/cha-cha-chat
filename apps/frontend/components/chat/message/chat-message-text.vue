<script setup lang="ts">
import Autolinker from "autolinker";

const props = defineProps({
  isOwn: Boolean,
  text: String
});

const formatted = computed(() => "<p>" + Autolinker.link(props.text ?? "") + "</p>");
</script>

<template>
  <div
    v-html="formatted"
    :class="[
      'flex rounded-xl p-2 text-sm wrap-anywhere text-white',
      { 'bg-primary': props.isOwn, 'bg-grey-dark': !props.isOwn }
    ]"
  ></div>
</template>
"
