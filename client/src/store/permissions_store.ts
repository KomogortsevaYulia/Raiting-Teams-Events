import axios from "axios";
import { ref } from "vue";
import type { Permission } from "@/types";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const usePermissionsStore = defineStore("permissionsStore", () => {
  const router = useRouter();

  const user_id = ref(-1);
  const username = ref("");
  const fullname = ref("");
  const permissions = ref<Array<Permission>>([]);
  const isLogged = ref(false);

  // проверить есть ли у залогиненого юзера данное разрешение
  function can(permission: Permission) {
    // проверить наличие данного разрешения у пользователя
    return (
      permissions.value &&
      (permissions.value.includes(permission) ||
        permissions.value.includes("can all"))
    );
  }

  // получить нужные данные от юзера
  async function checkLogin() {
    const response = await axios.get("/api/users/check-login", {
      withCredentials: true,
    });

    if (response?.data) {
      isLogged.value = true;
      permissions.value = response.data.permissions;
      username.value = response.data.username;
      fullname.value = response.data.fullname;
      user_id.value = response.data.id;

      let nextUrl = "/news";
      if (
        typeof router.options.history.state.current == "string" &&
        router.options.history.state.current != "/" &&
        router.options.history.state.current != "/#/"
      ) {
        nextUrl = router.options.history.state.current;
      }
      await router.push(nextUrl);
    } else {
      permissions.value = [];
      username.value = "";
      fullname.value = "";
    }
  }

  // отправка данных юзера при входе на проверку на сервер
  async function login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    const response = await axios.post("/api/users/login", {
      user: {
        username: username,
        password: password,
      },
    });

    if (response) {
      isLogged.value = true;
      // router.push('/news')
    } else isLogged.value = false;

    await checkLogin();

    return isLogged;
  }

  async function loginCampus(code: string) {
    const response = await axios.get("/api/users/bitrix-auth", {
      params: {
        code: code,
      },
    });

    isLogged.value = !!response;

    await checkLogin();

    return isLogged;
  }

  // разлогиниться
  async function logout() {
    await axios.post("/api/users/logout");

    permissions.value = [];
    fullname.value = "";
    isLogged.value = false;

    await router.push("/news");
    await checkLogin();
  }

  // Получение информации о юзере
  async function fetchUser() {
    const res = await axios.get("/api/users/check-login");
    return res.data;
  }

  async function changePermissions(userId: number, permissions: string[]) {
    return await axios.post("/api/users/permissions", {
      userId: userId,
      permissions: permissions,
    });
  }

  return {
    permissions,
    username,
    fullname,
    isLogged,
    user_id,

    fetchUser,
    checkLogin,
    login,
    loginCampus,
    logout,
    can,
    changePermissions,
  };
});
