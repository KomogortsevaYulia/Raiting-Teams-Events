export interface UserData {
  email: string;
  token: string;
  id: number;
}

export interface UserRO {
  user: UserData;
}