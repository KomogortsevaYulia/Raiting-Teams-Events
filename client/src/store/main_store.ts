import { defineStore } from "pinia";
import { usePermissionsStore } from "@/store/permissions_store";

export const useMainStore = defineStore("mainStore", () => {
  // Хранилище с
  const permissionsStore = usePermissionsStore();

  async function checkLogin() {
    await permissionsStore.checkLogin();
  }

  async function login(data: { username: string; password: string }) {
    await permissionsStore.login(data);
  }

  return {
    checkLogin,
    login,
  };
});
