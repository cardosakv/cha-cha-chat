<script setup lang="ts">
import type { MessageDto, UserJoinDto, UserOnlineOfflineDto, UsersOnlineDto } from "@cha-cha-chat/dto";
import { SocketEvent } from "@cha-cha-chat/types";
import { KEY_USERNAME, TIME_DIVIDER_GAP_MILLIS } from "~/shared/constants";
import type { WsMessage } from "~/types/ws-message";
import { WsMessageType } from "~/types/ws-message-type";

useHead({ title: "Cha-Cha-Chat" });
definePageMeta({ middleware: "auth" });

const config = useRuntimeConfig();
const socket = useSocket(config.public.apiBaseUrl);

const currentUser = useCookie(KEY_USERNAME);
const onlineUsers = ref<string[]>();
const inputMessage = ref<string>("");
const messages = ref<WsMessage[]>([]);

function sendMessage() {
  const message: MessageDto = {
    username: currentUser.value ?? "",
    content: inputMessage.value.trim(),
    timestamp: Date.now()
  };

  socket.emit(SocketEvent.MESSAGE_SEND, message);
  inputMessage.value = "";
}

function shouldShowUsername(index: number): boolean {
  const current = messages.value[index];
  const next = messages.value[index + 1];

  if (!next) return true;

  if (current.type === WsMessageType.Message && next.type === WsMessageType.Message) {
    const currentData = current.data as MessageDto;
    const previousData = next.data as MessageDto;

    return currentData.username !== previousData.username;
  }

  return true;
}

function shouldShowIcon(index: number): boolean {
  const current = messages.value[index];
  const previous = messages.value[index - 1];

  if (index === 0 || !previous) return true;

  if (current.type === WsMessageType.Message && previous.type === WsMessageType.Message) {
    const currentData = current.data as UserOnlineOfflineDto;
    const previousData = previous.data as UserOnlineOfflineDto;

    return currentData.username !== previousData.username;
  }

  return true;
}

function shouldShowTimeDivider(index: number): boolean {
  const current = messages.value[index];
  const previous = messages.value[index + 1];

  if (!previous) return true;

  const currentTimestamp = current.data.timestamp;
  const previousTimestamp = previous.data.timestamp;

  return currentTimestamp - previousTimestamp > TIME_DIVIDER_GAP_MILLIS;
}

onMounted(() => {
  const userOnline: UserOnlineOfflineDto = {
    username: currentUser.value as string
  };
  socket.connect(userOnline);

  const userJoin: UserJoinDto = {
    username: currentUser.value as string,
    timestamp: Date.now()
  };
  socket.emit(SocketEvent.USER_JOIN, userJoin);

  socket.on(SocketEvent.USERS_ONLINE, (payload: UsersOnlineDto) => {
    onlineUsers.value = payload.usernames;
  });

  socket.on(SocketEvent.USER_ONLINE, (payload: UserOnlineOfflineDto) => {
    if (!onlineUsers.value?.includes(payload.username) && currentUser.value != payload.username) {
      onlineUsers.value?.push(payload.username);
    }
  });

  socket.on(SocketEvent.USER_OFFLINE, (payload: UserOnlineOfflineDto) => {
    onlineUsers.value = onlineUsers.value?.filter((un) => un != payload.username);
  });

  socket.on(SocketEvent.USER_JOIN, (payload: UserJoinDto) => {
    const message: WsMessage = {
      type: WsMessageType.JoinNotif,
      data: payload
    };

    messages.value?.unshift(message);
  });

  socket.on(SocketEvent.MESSAGE_RECEIVE, (payload: MessageDto) => {
    const message: WsMessage = {
      type: WsMessageType.Message,
      data: payload
    };

    messages.value?.unshift(message);
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
              v-if="message.type === WsMessageType.Message"
              :username="currentUser == message.data.username ? '' : message.data.username"
              :isOwn="currentUser == message.data.username"
              :show-username="shouldShowUsername(index)"
              :show-icon="shouldShowIcon(index)"
              :media="(message.data as MessageDto).attachment"
              :text="(message.data as MessageDto).content"
              :timestamp="(message.data as MessageDto).timestamp"
            />
            <UserJoin
              v-if="message.type === WsMessageType.JoinNotif"
              :username="(message.data as UserJoinDto).username"
              :timestamp="(message.data as UserJoinDto).timestamp"
            />
            <TimeDivider v-if="shouldShowTimeDivider(index)" :timestamp="message.data.timestamp" />
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
