<script setup lang="ts">
import type { ChatEventDto, MessageDto, UserJoinDto, UserOnlineOfflineDto, UsersOnlineDto } from "@cha-cha-chat/dto";
import { SocketEvent } from "@cha-cha-chat/types";
import { KEY_USERNAME, TIME_DIVIDER_GAP_MILLIS } from "~/shared/constants";

useHead({ title: "Cha-Cha-Chat" });
definePageMeta({ middleware: "auth" });

const config = useRuntimeConfig();
const socket = useSocket(config.public.apiBaseUrl);

const currentUser = useCookie(KEY_USERNAME);
const onlineUsers = ref<string[]>();
const chatEvents = ref<ChatEventDto[]>([]);

const chatContainer = useTemplateRef("chatContainer");

function sendMessageText(inputMessage: string) {
  const message: MessageDto = {
    username: currentUser.value ?? "",
    content: inputMessage.trim(),
    timestamp: Date.now()
  };

  socket.emit(SocketEvent.MESSAGE_SEND, message);
}

function sendMessageImage(imageBase64: string) {
  const message: MessageDto = {
    username: currentUser.value ?? "",
    attachment: imageBase64,
    timestamp: Date.now()
  };

  socket.emit(SocketEvent.MESSAGE_SEND, message);
}

function shouldShowUsername(index: number): boolean {
  const current = chatEvents.value[index];
  const next = chatEvents.value[index + 1];

  if (!next) return true;

  if (current.type === "message" && next.type === "message") {
    const currentData = current.data as MessageDto;
    const previousData = next.data as MessageDto;

    return currentData.username !== previousData.username;
  }

  return true;
}

function shouldShowIcon(index: number): boolean {
  const current = chatEvents.value[index];
  const previous = chatEvents.value[index - 1];

  if (index === 0 || !previous) return true;

  if (current.type === "message" && previous.type === "message") {
    const currentData = current.data as UserOnlineOfflineDto;
    const previousData = previous.data as UserOnlineOfflineDto;

    return currentData.username !== previousData.username;
  }

  return true;
}

function shouldShowTimeDivider(index: number): boolean {
  const current = chatEvents.value[index];
  const previous = chatEvents.value[index + 1];

  if (!previous) return true;

  const currentTimestamp = current.data.timestamp;
  const previousTimestamp = previous.data.timestamp;

  return currentTimestamp - previousTimestamp > TIME_DIVIDER_GAP_MILLIS;
}

function setupSocketEvents() {
  socket.on(SocketEvent.FEED_RECEIVE, (data: ChatEventDto[]) => {
    console.log(data);
    chatEvents.value.push(...data);
  });

  socket.on(SocketEvent.USERS_ONLINE, (data: UsersOnlineDto) => {
    onlineUsers.value = data.usernames;
  });

  socket.on(SocketEvent.USER_ONLINE, (data: UserOnlineOfflineDto) => {
    if (onlineUsers.value?.includes(data.username)) return;
    if (currentUser.value == data.username) return;

    onlineUsers.value?.push(data.username);
  });

  socket.on(SocketEvent.USER_OFFLINE, (data: UserOnlineOfflineDto) => {
    onlineUsers.value = onlineUsers.value?.filter((un) => un != data.username);
  });

  socket.on(SocketEvent.USER_JOIN, (data: ChatEventDto) => {
    chatEvents.value?.unshift(data);
  });

  socket.on(SocketEvent.MESSAGE_RECEIVE, (data: ChatEventDto) => {
    chatEvents.value?.unshift(data);
  });
}

function connectSocket() {
  const userJoin: UserJoinDto = {
    username: currentUser.value as string,
    timestamp: Date.now()
  };

  socket.connect(userJoin);
}

function addScrollEvent() {
  chatContainer.value?.addEventListener("scroll", () => {
    if (!chatContainer.value) return;

    const threshold = chatContainer.value.scrollTop * -1;
    const maxScroll = chatContainer.value.scrollHeight - chatContainer.value.clientHeight - 5;

    if (threshold >= maxScroll) {
      const messages = chatEvents.value?.filter((e) => e.type == "message");
      const lastMessageId = Math.min(...messages.map((e) => (e.data as MessageDto).id ?? 0));
      socket.emit(SocketEvent.FEED_GET, { lastMessageId: lastMessageId });
    }
  });
}

onMounted(() => {
  connectSocket();
  setupSocketEvents();
  addScrollEvent();
});
</script>

<template>
  <NuxtLayout name="chat">
    <template #main>
      <div class="flex min-h-0 flex-1 flex-col pb-5">
        <div
          class="custom-scroll flex flex-1 flex-col-reverse items-center justify-start gap-2 overflow-y-scroll pr-2"
          ref="chatContainer"
        >
          <template v-for="(chatEvent, index) in chatEvents">
            <ChatMessage
              v-if="chatEvent.type == 'message'"
              :username="currentUser == chatEvent.data.username ? '' : chatEvent.data.username"
              :isOwn="currentUser == chatEvent.data.username"
              :show-username="shouldShowUsername(index)"
              :show-icon="shouldShowIcon(index)"
              :media="(chatEvent.data as MessageDto).attachment"
              :text="(chatEvent.data as MessageDto).content"
              :timestamp="(chatEvent.data as MessageDto).timestamp"
            />
            <UserJoin
              v-if="chatEvent.type == 'user-join'"
              :username="(chatEvent.data as UserJoinDto).username"
              :timestamp="(chatEvent.data as UserJoinDto).timestamp"
            />
            <TimeDivider v-if="shouldShowTimeDivider(index)" :timestamp="chatEvent.data.timestamp" />
          </template>
        </div>
      </div>
      <div class="flex items-end justify-between">
        <ChatBox @send-text="sendMessageText" @send-file="sendMessageImage" />
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
