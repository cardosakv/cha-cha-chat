export interface MessageDto {
  username: string;
  content?: string;
  timestamp: Date;
  attachment?: string;
}

export interface UserDto {
  username: string;
  joinedAt: Date;
}

export interface UserOnlineOfflineDto {
  user: string;
}

export interface UsersOnlineDto {
  users: string[];
}
