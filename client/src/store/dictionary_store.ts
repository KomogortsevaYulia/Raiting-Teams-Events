import { defineStore } from "pinia";
import { computed, ref } from "vue";
// import type { Permission } from "@/types";
import axios from "axios";

export const useDictionaryStore = defineStore("dictionary", () => {

    async function getDictionary(id: number) {

        const res = await axios.get("api/general/dictionary/" + id)
        const data = res.data

        return data
    }

// полуичить все записи по имени класса
    async function getFromDictionaryByClassName(class_name: string) {

        const res = await axios.get("api/general/dictionary/", {
            params: {
                class_name: class_name
            }
        })

        const data = res.data

        return data
    }

// полуичить все записи по ид класса
    async function getFromDictionaryByClassID(class_id: number) {

        const res = await axios.get("api/general/dictionary/", {
            params: {
                class_id: class_id
            }
        })

        const data = res.data

        return data
    }

    return {
        getDictionary,
        getFromDictionaryByClassName,
        getFromDictionaryByClassID
    }

});