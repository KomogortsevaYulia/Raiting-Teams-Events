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

    return {
        getDictionary
    }

});