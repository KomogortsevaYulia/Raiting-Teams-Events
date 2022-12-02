import {defineStore} from 'pinia'
import {ref} from "vue";
import axios from "axios";
import { useUserPermissionsStore } from '@/store/permissions_store';

export const useMainStore = defineStore("main", () => {
    const userPermissionsStore = useUserPermissionsStore();
    
    async function checkLogin() {
        userPermissionsStore.checkLogin()
        console.log('aloha');
    }

    async function login(data: { username: string, password: string }) {
        userPermissionsStore.login(data);
        console.log('it is login');
    }

    return {
        checkLogin,
        login
    }
})