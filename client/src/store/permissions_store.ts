import axios from "axios";
import { computed, ref } from "vue";
import type { Permission } from "@/types";
import { defineStore } from "pinia";
import { useRoute, useRouter } from "vue-router";

export const usePermissionsStore = defineStore("permissionsStore", () => {
    const router = useRouter();

    const username = ref("")
    const fullname = ref("")
    const permissions = ref<Array<Permission>>([])
    const isLogged = ref(false)

    // проверить есть ли у залогиненого юзера данное разрешение
    function can(permission: Permission) {
        // проверить наличие данного разрешения у пользователя
        return permissions.value.includes(permission)
    }

    // получить нужные данные от юзера
    async function checkLogin() {
        let response = await axios.get("api/users/check-login")

        if (isLogged) {
            isLogged.value = true;
            permissions.value = response.data.permissions
            username.value = response.data.username
            fullname.value = response.data.fullname

            let nextUrl = "/news";
            if (typeof router.options.history.state.current == 'string' && router.options.history.state.current != '/' && router.options.history.state.current != '/#/') {
                nextUrl = router.options.history.state.current
            }
            router.push(nextUrl)

        } else {
            permissions.value = []
            username.value = ''
            fullname.value = ''
        }
    }

    // отправка данных юзера при входе на проверку на сервер
    async function login({ username, password }: { username: string, password: string }) {
              
        let response = await axios.post("/api/users/login", {
            "user": {
                username: username,
                password: password
            }
        })

        if (response) {
            isLogged.value = true;
            // router.push('/news')
        } else isLogged.value = false;

      
        await checkLogin();

        return isLogged;
    }

    // разлогиниться
    async function logout() {
        // @ts-ignore
        await axios.post("/api/users/logout")

        permissions.value = []
        fullname.value = ''
        isLogged.value = false

        router.push('/news')
        await checkLogin()
    }

    // Получение информации о юзере
    async function fetchUser(): Promise<any> {
        const res = await axios.get('/api/users/check-login')
        const data = res.data
        return data
    }

    return {
        permissions,
        username,
        fullname,
        isLogged,

        fetchUser,
        checkLogin,
        login,
        logout,
        can
    }
})