import { defineStore } from "pinia";
import { computed, ref } from "vue";
// import type { Permission } from "@/types";
import axios from "axios";

export const useEventStore = defineStore("events", () => {
    const layout = ref(true)

    function CreateTeamsTest() {
        console.log('Это сработало!');
    }

    // Вывести все коллективвы с руководителсями
   async function fetchEvents():Promise<any> {
        const res = await axios.get('/api/events')
        const data = res.data

        return data
    }

    async function createEvent(title: String, description: String,
        dateStart: Date, dateEnd: Date, dateStartRegistration: Date,
        dateEndRegistration: Date, eventGoal: String, eventPlace: String, level: String,
        eventFormat: String, concreteSphere: String, eventSphere: String,
        teamSize: String, eventType: String, control: String, planeParticipantSize: String,
        participantionType: String, email: String, phone: String, social_links: String[] ) {

        let responseMsg = "сохранено"

        //create team
        await axios.post("api/events", {
            title: title,
            description: description,
            dateStart: dateStart,
            dateEnd: dateEnd,
            dateStartRegistration: dateStartRegistration,
            dateEndRegistration: dateEndRegistration,
            eventGoal: eventGoal,
            location: location,
            level: level,
            format: format,
            clarifying_direction: clarifying_direction, 
            character_event: character_event,
            teamSize: teamSize,
            eventType: eventType,
            control: control,
            count_people: count_people,
            type_participation: type_participation,
            email: email,
            phone: phone,
            social_links: social_links 
        })
            .catch((err) => {
                if (err.response) {
                    responseMsg = err.response.data.message[0]
                }
            })

        return responseMsg
    }



    return {
        CreateTeamsTest,
        fetchEvents,
        createEvent,

        layout,
    }

});