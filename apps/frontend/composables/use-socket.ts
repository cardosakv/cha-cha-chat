import { io, Socket } from "socket.io-client";
import type { MessageDto, UserOnlineOfflineDto } from "@cha-cha-chat/dto";
import type { SocketEvent } from "@cha-cha-chat/types";

export const useSocket = (url: string) => {
  const socket = ref<Socket>();

  function connect(query: any) {
    try {
      socket.value = io(url, { query: query });
    } catch (err) {
      console.error(err);
    }
  }

  function disconnect() {
    try {
      socket.value?.disconnect();
    } catch (err) {
      console.error(err);
    }
  }

  function emit(event: SocketEvent, message: MessageDto | UserOnlineOfflineDto) {
    try {
      socket.value?.emit(event, message);
    } catch (err) {
      console.error(err);
    }
  }

  function on(event: SocketEvent, handler: (payload: any) => void) {
    try {
      socket.value?.on(event, handler);
    } catch (err) {
      console.error(err);
    }
  }

  return {
    socket,
    connect,
    disconnect,
    emit,
    on
  };
};
