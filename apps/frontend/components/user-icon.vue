<script setup lang="ts">
import multiavatar from "@multiavatar/multiavatar";

const props = defineProps({
  username: String
});

const avatarSvg = computed(() => multiavatar(props.username ?? "default"));
</script>

<template>
  <div class="min-h-9 min-w-9 rounded-full brightness-90" v-html="avatarSvg" :title="props.username"></div>
</template>
