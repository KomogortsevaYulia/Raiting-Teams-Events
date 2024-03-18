import type {ICabinetsTime} from "@/store/models/schedule/cabinets-time.model";

export interface IScheduleSearch {
  // find
  ids?: number[];
}

export interface ISchedule {
  cabinets_time?: ICabinetsTime[];
}

