import { Level, Type } from "@/store/enums/enum_event";
import { TypeSeason } from "@/store/enums/enums_report";
import { useEventStore } from "@/store/events_store";
import { useJournalStore } from "@/store/journals_store";
import type { number } from "echarts/core";
import { defineStore } from "pinia";

export const useChartStore = defineStore("echarts", () => {

    const journalStore = useJournalStore();
    const eventStore = useEventStore();

    // подсчет количества внутренних/внешних мероприятий
    function countEventsInnerOuter(events: any) {

        let inner = 0
        let outer = 0

        for (let i = 0; i < events.length; i++) {

            let event = events[i]
            if (event.type == Type.INSIDE) inner += 1
            else outer += 1
        }


        return [
            { value: inner, name: Type.INSIDE },
            { value: outer, name: Type.OUTSIDE },]
    }


    // подсчет количества внутренних/внешних мероприятий
    function countEventsBySeason(events: any) {



        let spring = 0
        let summer = 0
        let autumn = 0
        let winter = 0

        for (let i = 0; i < events.length; i++) {

            let event = events[i]
            let date = new Date(event.dateStart)
            let month = date.getMonth()
            // console.log("event.date  " + new Date( event.dateStart))

            if (month <= 2 || month == 12) winter += 1
            else if (month <= 5) spring += 1
            else if (month <= 8) summer += 1
            else if (month <= 11) autumn += 1
            // else outer += 1
        }

        return [
            { value: spring, name: TypeSeason.SPRING },
            { value: autumn, name: TypeSeason.AUTUMN },
            { value: winter, name: TypeSeason.WINTER },
            { value: summer, name: TypeSeason.SUMMER },]
    }

    async function countTeamsEvents(teams: { name: string, id: number }[], dateStart: Date, dateEnd: Date,
        level: Level,
        type: Type, count = 200) {
      
        let dataTopTm:number[] = []
        let labelsTopTm:string[] = []

        let c = 0 //just counter
        teams.forEach(async (it) => {
           
            if(c >= count)return
            c++

            labelsTopTm.push(it.name)
            let countEvents = 0
            let data = await journalStore.fetchJournals(it.id)

            //получить всех найденне journal
            let journals = data[0]

            let arrayData = []


            for (let i = 0; i < journals.length; i++) {
                let journal = journals[i]


                let eventId: number = journal.event.id

                let event = await eventStore.fetchEventById(eventId,
                    dateStart, dateEnd,
                    level,
                    type)


                if (event ?? false) {
                    arrayData[i] = event
                    countEvents++

                }
            }
            dataTopTm.push(countEvents)
        })


        return { dataTopTeams: dataTopTm, labelsTopTeams:labelsTopTm }
    }

    return {
        countEventsInnerOuter,
        countEventsBySeason,
        countTeamsEvents
    }
})