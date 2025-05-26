<script setup lang="ts">
const input = defineModel<string>();
</script>

<template>
  <input class="bg-grey-dark placeholder-grey-medium rounded-sm p-3 text-center text-base text-white outline-none hover:brightness-120" v-model="input" placeholder="Input here..." type="text" />
</template>
