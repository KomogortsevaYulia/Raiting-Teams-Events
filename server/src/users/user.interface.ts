export interface UserData {
  email: string;
  token: string;
  id: number;
  // studnumber: number;
  // fullname: string;
}

export interface UserRO {
  user: UserData;
}