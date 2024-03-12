import { defineStore } from "pinia";
import axios from "axios";
import { ApiRequest } from "@/store/handleApiRequest";
import type {IScheduleSearch} from "@/store/models/schedule/schedule.model";

export const useAuditoriesStore = defineStore("cabinets", () => {
  const apiRequest = new ApiRequest();

  async function getCabinets(sch: IScheduleSearch) {
    return apiRequest.handleApiRequest(async () => {
      return await axios.get("/api/schedule/cabinets/", { params: sch });
    });
  }

  return {
    getCabinets,
  };
});
