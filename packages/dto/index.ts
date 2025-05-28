export interface MessageDto {
  username: string;
  content: string;
  timestamp: Date;
  attachment: string;
}

export interface UserDto {
  username: string;
  joinedAt: Date;
}
