<script setup lang="ts">
import type { MessageDto } from "@cha-cha-chat/dto";
import { SocketEvent } from "@cha-cha-chat/types";
import { KEY_USERNAME } from "~/shared/constants";

useHead({ title: "Cha-Cha-Chat" });
definePageMeta({ middleware: "auth" });

const config = useRuntimeConfig();
const socket = useSocket(config.public.apiBaseUrl);

const currentUser = useCookie(KEY_USERNAME);
const onlineUsers = ref<string[]>();
const inputMessage = ref<string>("");
const messages = ref<MessageDto[]>([]);

function sendMessage() {
  const message: MessageDto = {
    username: currentUser.value ?? "",
    content: inputMessage.value.trim(),
    timestamp: new Date()
  };

  socket.emit(SocketEvent.MESSAGE_SEND, message);
  inputMessage.value = "";
}

function shouldShowUsername(index: number): boolean {
  if (index === messages.value.length - 1) return true;

  const nextMessage = messages.value[index + 1];
  if (!nextMessage) return true;

  return messages.value[index].username !== nextMessage.username;
}

function shouldShowIcon(index: number): boolean {
  const currentUser = messages.value[index].username;

  if (index === 0) return true;

  const previousMessage = messages.value[index - 1];
  if (!previousMessage) return true;

  return currentUser !== previousMessage.username;
}

onMounted(() => {
  socket.connect({ username: currentUser.value });

  socket.on(SocketEvent.USERS_ONLINE, (payload: { users: string[] }) => {
    onlineUsers.value = payload.users;
  });

  socket.on(SocketEvent.USER_ONLINE, (payload: { user: string }) => {
    if (!onlineUsers.value?.includes(payload.user) && currentUser.value != payload.user) {
      onlineUsers.value?.push(payload.user);
    }
  });

  socket.on(SocketEvent.USER_OFFLINE, (payload: { user: string }) => {
    onlineUsers.value = onlineUsers.value?.filter((un) => un != payload.user);
  });

  socket.on(SocketEvent.MESSAGE_RECEIVE, (payload: MessageDto) => {
    messages.value?.unshift(payload);
  });
});
</script>

<template>
  <NuxtLayout name="chat">
    <template #main>
      <div class="flex min-h-0 flex-1 flex-col pb-5">
        <div class="custom-scroll flex flex-1 flex-col-reverse items-center justify-start gap-2 overflow-y-scroll pr-2">
          <template v-for="(message, index) in messages">
            <ChatMessage
              :username="currentUser == message.username ? '' : message.username"
              :isOwn="currentUser == message.username"
              :show-username="shouldShowUsername(index)"
              :show-icon="shouldShowIcon(index)"
              :media="message.attachment"
              :text="message.content"
            />
          </template>
        </div>
      </div>
      <div class="flex items-end justify-between">
        <ChatBox v-model="inputMessage" @send="sendMessage" />
      </div>
    </template>
    <template #sidebar>
      <div class="flex min-h-0 flex-col">
        <UsersYou :username="currentUser ?? ''" />
        <UsersAll :usernames="onlineUsers" />
      </div>
    </template>
  </NuxtLayout>
</template>
