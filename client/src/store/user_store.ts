import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", () => {
  //получить юзерова по имени, емеил
  async function getUsersByNameEmail(
    limit: number,
    fullname: string,
    email: string,
  ) {
    return await axios.get("/api/users", {
      params: {
        limit: limit,
        fullname: fullname,
        email: email,
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

  async function loginBitrix(code: string) {
    return await axios.get("/api/users/bitrix-auth/", {
      params: {
        code: code,
      },
    });
  }

  return {
    getUsersByNameEmail,
    update,
    getUsersFunction,
    loginBitrix,
  };
});
