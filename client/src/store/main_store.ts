import { defineStore } from 'pinia';
import { ref } from "vue";
import axios from "axios";
import { usePermissionsStore } from '@/store/permissions_store';

export const useMainStore = defineStore("mainStore", () => {
    // Хранилище с 
    const permissionsStore = usePermissionsStore();

    async function checkLogin() {
        permissionsStore.checkLogin()
    }

    async function login(data: { username: string, password: string }) {
        permissionsStore.login(data);
    }

    return {
        checkLogin,
        login
    }
})