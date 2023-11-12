import { defineStore } from "pinia";
import axios from "axios";

export const useUserFunctionsStore = defineStore("user_function", () => {
  //удалить функцию юзера по ид
  async function removeUserFunction(id: number) {
    const res = await axios.delete("/api/users/user-functions/" + id);

    return res.data;
  }

  //найти ункции юзера
  async function findUserFunctions(team_id: number, user_id: number) {
    const res = await axios.get("/api/users/user-functions/", {
      params: {
        user: user_id,
        team: team_id,
      },
    });

    return res.data;
  }

  return {
    removeUserFunction,
    findUserFunctions,
  };
});
