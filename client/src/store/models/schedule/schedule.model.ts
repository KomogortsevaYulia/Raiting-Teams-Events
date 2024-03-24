import type { ICabinetsTime } from "@/store/models/schedule/cabinets-time.model";

export interface ICabinetsSearch {
  // find
  ids?: number[];
  tag?: string;
  time_start?:string;
  time_end?:string;

  //additional
  search?: string;
  free_time?: string;
}

export interface ISchedule {
  cabinets_time?: ICabinetsTime[];
}
