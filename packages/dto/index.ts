export interface MessageDto {
  id?: number;
  username: string;
  content?: string;
  timestamp: number;
  attachment?: string;
}

export interface UserDto {
  username: string;
  joinedAt: number;
}

export interface UserOnlineOfflineDto {
  username: string;
}

export interface UsersOnlineDto {
  usernames: string[];
}

export interface UserJoinDto {
  username: string;
  timestamp: number;
}

export interface ChatEventDto {
  type: "message" | "user-join";
  data: MessageDto | UserJoinDto;
}

export interface GetFeedDto {
  lastMessageId: number;
}
