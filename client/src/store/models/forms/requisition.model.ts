import type {IDictionary} from "@/store/models/dictionary/dictionary.model";
import type {IUser} from "@/store/models/user/user.model";

export interface IRequisition {
    id?: number;
    status?:IDictionary;
    user?:IUser;
    date_update?:string;
}