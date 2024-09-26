import { defineStore } from "pinia";
import axios from "axios";

export const useDictionaryStore = defineStore("dictionary", () => {
  async function getDictionary(id: number) {
    const res = await axios.get("api/general/dictionary/" + id);
    return res.data;
  }

  // полуичить все записи по имени класса
  async function getFromDictionaryByClassName(class_name: string) {
    const res = await axios.get("api/general/dictionary", {
      params: {
        class_name: class_name,
      },
    });

    return res.data;
  }

  // полуичить все записи по ид класса
  async function getFromDictionaryByClassID(class_id: number) {
    const res = await axios.get("api/general/dictionary", {
      params: {
        class_id: class_id,
      },
    });

    return res.data;
  }

  return {
    getDictionary,
    getFromDictionaryByClassName,
    getFromDictionaryByClassID,
  };
});
