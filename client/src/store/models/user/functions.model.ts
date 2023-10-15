import type { IUserFunction } from "@/store/models/user/user-functions.model";

export interface IFunction {
  id?: number;
  title?: string;
  userFunctions?: IUserFunction[];
}
