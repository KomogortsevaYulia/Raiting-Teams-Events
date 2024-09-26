import { defineStore } from "pinia";
import axios from "axios";

export const useFunctionsStore = defineStore("function", () => {
  async function update(
    education_group: string,
    title_role: string,
    id: number,
  ) {
    await axios.patch("/api/functions/" + id, {
      education_group,
      title_role,
    });
  }

  return {
    update,
  };
});
