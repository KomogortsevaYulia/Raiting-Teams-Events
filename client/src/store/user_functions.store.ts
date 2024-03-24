import { defineStore } from "pinia";
import axios from "axios";
import {ApiRequest} from "@/store/handleApiRequest";

export const useUserFunctionsStore = defineStore("user_function", () => {
  const apiRequest = new ApiRequest();

  //удалить функцию юзера по ид
  async function removeUserFunction(id: number) {
    const res = await axios.delete("/api/users/user-functions/" + id);

    return res.data;
  }

  //найти ункции юзера
  async function findUserFunctions(team_id: number, user_id: number) {
    return apiRequest.handleApiRequest(async () => {
      return await axios.get("/api/users/user-functions/", {
        params: {
          user: user_id,
          team: team_id,
        },
      });
    })
  }

  return {
    removeUserFunction,
    findUserFunctions,
    apiRequest
  };
});
