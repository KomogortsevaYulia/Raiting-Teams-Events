import type { IFunction } from "@/store/models/user/functions.model";

export interface ITeam {
  id?: number;
  image?: string;
  tags?: string[];
  description?: string;
  id_parent?: ITeam;
  title?: string;
  shortname?: string;
  cabinets?: number[];
  is_archive?: boolean;
  charter_team?: string;
  document?: string;
  short_description?: string;
  set_open?: boolean;
  functions?: IFunction[];
}
