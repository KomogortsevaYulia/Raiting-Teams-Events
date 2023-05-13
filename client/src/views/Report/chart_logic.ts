import { Level, Type } from "@/store/enums/enum_event";
import { TypeSeason } from "@/views/Report/enums_report";
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
            if (event.type != null && event.type.id == Type.INSIDE) inner += 1
            else if (event.type != null && event.type.id == Type.OUTSIDE) outer += 1
        }


        return [
            { value: inner, name: "Внутренние" },
            { value: outer, name: "Внешние" },]
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
        level: number,
        type: number, count = 200) {

        let dataTopTm: number[] = []
        let labelsTopTm: string[] = []

        let c = 0 //just counter
        teams.forEach(async (team) => {


            if (c >= count) return
            c++

            let events = await eventStore.getEventsViaJournalsByTeam(team.id, dateStart, dateEnd, type, level)

            dataTopTm.push(events.data[1])
            labelsTopTm.push(team.name)
        })


        return { dataTopTeams: dataTopTm, labelsTopTeams: labelsTopTm }
    }


    // async function countTeamsEvents(teams: { name: string, id: number }[], dateStart: Date, dateEnd: Date,
    //     level: number,
    //     type: number, count = 10) {

    //     let capacity = (count > teams.length ? count : teams.length)

    //     let dataTopTm: number[] = new Array(capacity)
    //     let labelsTopTm: string[] = new Array(capacity)
    //     let dataLabel: string[] = []

    //     let data: number[] = []


    //     let findIndexMax = (arr: number[]) => {
    //         let max = 0
    //         let index = 0

    //         console.log(arr[0])
    //         for (let i = 0; i < arr.length; i++) {
                
    //             console.log("arr[i] " + arr[i])
    //             console.log("max " + max)
    //             if (arr[i] > max) {
                
    //                 max = arr[i]
    //                 index = i
    //             }
    //         }

    //         return index
    //     }
    //     // let topLargest = new Array(count).fill({ data: 0, label: "" })

    //     let ind = 0
    //     teams.forEach(async (team) => {

    //         let events = await eventStore.getEventsViaJournalsByTeam(team.id, dateStart, dateEnd, type, level)
    //         let countE:number = events.data[1]
    //         let label:string = team.name

    //         dataLabel[ind] = label
    //         data[ind] = countE
    //         ind++
    //     })

    //     console.log(data.length + " ddddddddddddddddd ")

    //     for (let i = 0; i < count; i++) {
    //         console.log(data.length + " hngdndfgf ")
    //         let indexMax = findIndexMax(data)
    //         dataTopTm[i] = data[indexMax]
    //         labelsTopTm[i] = dataLabel[i]
    //         data[indexMax] = -1
    //     }

    //     // dataTopTm.push(events.data[1])
    //     // labelsTopTm.push(team.name)


    //     return { dataTopTeams: dataTopTm, labelsTopTeams: labelsTopTm }
    // }

    return {
        countEventsInnerOuter,
        countEventsBySeason,
        countTeamsEvents
    }
})