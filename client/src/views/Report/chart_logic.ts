import { Type } from "@/store/enums/enum_event";
import { defineStore } from "pinia";

export const useChartStore = defineStore("echarts", () => {

    function countEventsInnerOuter(events: any) {

        let inner = 0
        let outer = 0
     
        for (let i = 0; i < events.length; i++) {

          
            let event = events[i]
            console.log("event.type  " + event.type)
            if (event.type == Type.INSIDE) inner += 1
            else outer += 1
        }

        return [
            { value: inner, name: Type.INSIDE },
            { value: outer, name: Type.OUTSIDE },]
    }

    return {
        countEventsInnerOuter,
    }
})