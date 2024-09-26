import type { IDictionary } from "@/store/models/dictionary/dictionary.model";
import type { IUser } from "@/store/models/user/user.model";
import type {ITeam} from "@/store/models/teams/team.model";

export interface IRequisition {
  id?: number;
  status?: IDictionary;
  user?: IUser;
  team?: ITeam;
  comment_leader?: string;
  date_update?: string;
}
