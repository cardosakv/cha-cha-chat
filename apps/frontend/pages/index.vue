<script setup lang="ts">
import multiavatar from "@multiavatar/multiavatar/esm";
import { KEY_USERNAME } from "~/shared/constants";
import validateUsername from "~/utils/validate-username";

useHead({ title: "Welcome to Cha-Cha-Chat" });
definePageMeta({ middleware: "auth" });

const inputUsername = ref("");
const errorMessage = ref("");
const avatarSvg = computed(() => multiavatar(inputUsername.value));

async function handleRegisterClick() {
  errorMessage.value = await validateUsername(inputUsername.value);

  if (!errorMessage.value) {
    registerUser();
  }
}

function registerUser() {
  const username = useCookie(KEY_USERNAME);
  username.value = inputUsername.value;

  const { push } = useRouter();
  push("/chat");
}
</script>

<template>
  <NuxtLayout>
    <div class="flex h-full w-full flex-col items-center justify-center gap-10">
      <div class="flex flex-col items-center">
        <p class="mb-2 flex flex-col items-center text-4xl font-bold text-white sm:flex-row">
          <span class="flex items-center"> Welcome to&nbsp; </span>
          <span class="flex items-center">
            <span class="text-primary">Cha</span>
            <MdiIcon class="text-secondary pt-1 text-xs" icon="mdiMessage" />
            <span class="text-primary">Cha</span>
            <MdiIcon class="text-secondary pt-1 text-xs" icon="mdiMessage" />
            <span class="text-primary">Chat</span></span
          >
        </p>
        <p class="text-xl text-white">where everyone's invited to chit-chat</p>
      </div>

      <div class="h-32 w-32 brightness-90" v-html="avatarSvg"></div>

      <div class="flex flex-col items-center">
        <p class="text-grey-light mb-4 text-sm">Got something to say? Type a username and jump in.</p>
        <LandingInput
          class="mb-4 w-3/4"
          v-model="inputUsername"
          :error="errorMessage"
          @key-enter="handleRegisterClick"
        />
        <LandingButton class="w-3/4" label="Join the Chat" @click="handleRegisterClick" ref="joinButton" />
      </div>
    </div>
  </NuxtLayout>
</template>
