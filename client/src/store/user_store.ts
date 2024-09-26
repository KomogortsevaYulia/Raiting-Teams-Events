import { defineStore } from "pinia";
import axios from "axios";
import type {FilterUser} from "@/store/models/user.model";

export const useUserStore = defineStore("user", () => {
  //получить юзерова по имени, емеил
  async function getUsersByNameEmail(
   filterUser:FilterUser
  ) {
    return await axios.get("/api/users", {
      params: {
        limit: filterUser.limit,
        offset: filterUser.offset,
        searchTxt:filterUser.searchTxt
      },
    });
  }

  //обновить роль юзера
  async function update(
    education_group: string,
    title_role: string,
    id: number,
  ) {
    await axios.patch("/api/users/" + id, {
      education_group,
      title_role,
    });
  }

  // получить фцнкции юзера по ид фукнции
  async function getUsersFunction(id: number) {
    return await axios.get("/api/users/functions/" + id);
  }

  async function getUser(id: number) {
    return await axios.get("/api/users/" + id);
  }

  return {
    getUsersByNameEmail,
    update,
    getUsersFunction,
    getUser
  };
});
