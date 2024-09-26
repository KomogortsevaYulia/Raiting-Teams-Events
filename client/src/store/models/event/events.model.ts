import type { IDictionary } from "@/store/models/dictionary/dictionary.model";
import type { Type, Status } from "@/store/enums/enum_event";
import type { IUser } from "@/store/models/user/user.model";
import type {IJournal} from "@/store/models/event/journals.model";

// interface for search
export interface IEventSearch {
  type?: Type | IDictionary;
  status?: Status | IDictionary;
  direction?: number;

  user_id?: number;
  journal_team_id?:number,

  // addition
  search_text?: string;
  date_update_order?:string //'ASC' | 'DESC';
  limit?: number;
  offset?: number;
}

// interface for to keep Events
export interface IEvent {
  id?: number;
  type?: IDictionary;
  status?: IDictionary;
  direction?: IDictionary;
  title?: string;
  tags?: string[];
  description?: string;
  email?: string;
  phone?: string;
  social_links?: string[];
  event_place?: string;
  images?: string[];
  dateStart?: string;
  dateEnd?: string;
  dateStartRegistration?: string;
  dateEndRegistration?: string;
  date_update?: string;
  user?: IUser;
  level?: IDictionary;
  format?: IDictionary;
  count_people?: number;

  journal?:IJournal[];

  user_id?: number;
}
