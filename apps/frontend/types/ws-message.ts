import type { MessageDto, UserJoinDto } from "@cha-cha-chat/dto";
import type { WsMessageType } from "./ws-message-type";

export interface WsMessage {
  type: WsMessageType;
  data: MessageDto | UserJoinDto;
}
