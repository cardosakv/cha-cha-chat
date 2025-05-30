export interface MessageDto {
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
