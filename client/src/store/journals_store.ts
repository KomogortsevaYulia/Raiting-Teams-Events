import { defineStore } from "pinia";
import axios from "axios";

export const useJournalStore = defineStore("journals", () => {
  // data will be returned as index 0 - is data, index 1 is count
  async function fetchJournals(teamId: number = -1) {
    const res = await axios.get("/api/events/journal", {
      params: { team_id: teamId },
    });
    return res.data;
  }

  async function fetchJournalsByUserId(id: number) {
    const res = await axios.get("/api/events/journal/user/" + id);
    return res.data;
  }

  return {
    fetchJournals,
    fetchJournalsByUserId,
  };
});
