import type { IUser } from "@/store/models/user/user.model";
import type { IFunction } from "@/store/models/user/functions.model";

export interface IUserFunction {
  id?: number;
  user?: IUser;
  dateCreate?:string;
  dateUpdate?:string;
  function?: IFunction;
}
