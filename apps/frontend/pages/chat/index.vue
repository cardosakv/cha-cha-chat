<script setup lang="ts">
useHead({ title: "Cha-Cha-Chat" });
definePageMeta({ middleware: "auth" });
</script>

<template>
  <NuxtLayout name="chat">
    <template #main>
      <div class="flex min-h-0 flex-1 flex-col pb-5">
        <div class="custom-scroll flex flex-1 flex-col-reverse items-center gap-2 overflow-y-scroll pr-2">
          <ChatMessage :is-own="true" text="What you gonna huh" />
          <ChatMessage
            :is-own="false"
            media="data:image/png;base64,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"
            username="pikachu"
          />
          <ChatMessage :is-own="false" text="AHHAHAHAHAHAHAHA" username="pikachu" />
          <ChatMessage
            :is-own="false"
            text="Can you visit www.google.com or maybe chachachat-app.vercel.app"
            username="pikachu"
          />
          <UserJoin username="pikachu" />
          <TimeDivider :datetime="new Date()" />
        </div>
      </div>
      <div class="flex items-end justify-between">
        <ChatBox />
      </div>
    </template>
    <template #sidebar>
      <div class="flex min-h-0 flex-col">
        <UsersYou username="khxlvin" />
        <UsersAll :usernames="['shiella', 'joeyy', 'warlyy']" />
      </div>
    </template>
  </NuxtLayout>
</template>
