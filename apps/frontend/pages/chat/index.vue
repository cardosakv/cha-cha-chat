<script setup lang="ts">
useHead({ title: "Cha-Cha-Chat" });
definePageMeta({ middleware: "auth" });
</script>

<template>
  <NuxtLayout name="chat">
    <template #main>
      <ChatBox />
    </template>
    <template #sidebar>
      <div class="h-40 w-40 text-white">TEST</div>
    </template>
  </NuxtLayout>
</template>
