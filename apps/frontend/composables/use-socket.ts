import type { SocketEvent } from "@cha-cha-chat/types";
import { io, Socket } from "socket.io-client";

export const useSocket = (url: string) => {
  const socket = ref<Socket>();

  function connect(query: any) {
    try {
      socket.value = io(url, { query: query });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  function disconnect() {
    try {
      socket.value?.disconnect();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  function emit(event: SocketEvent, data: any) {
    try {
      socket.value?.emit(event, data);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  function on(event: SocketEvent, handler: (payload: any) => void) {
    try {
      socket.value?.on(event, handler);
      return true;
    } catch (err) {
      console.error(err);
      return false;
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
