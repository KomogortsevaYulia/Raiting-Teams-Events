import { defineStore } from "pinia";
import { ref } from "vue";
// import type { Permission } from "@/types";
import axios from "axios";
import type { Status } from "./enums/enum_event";

export const useEventStore = defineStore("event", () => {
  const layout = ref(true);

  async function getEventLevel() {
    const res = await axios.get(
      "/api/general/dictionary?class_name=уровень+мероприятия",
    );
    const data = res.data;

    return data;
  }

  function CreateTeamsTest() {
    console.log("Это сработало!");
  }

  async function fetchEvents(): Promise<any> {
    const res = await axios.get("/api/events");
    const data = res.data;

    return data;
  }

  async function createEvent(
    title: string,
    description: string,
    dateStart: Date,
    dateEnd: Date,
    dateStartRegistration: Date,
    dateEndRegistration: Date,
    event_goal: string,
    event_place: string,
    level: number,
    format: number,
    clarifying_direction: number,
    character_event: number,
    team_size: string,
    direction: number,
    control: string,
    count_people: number,
    type_participation: number,
    email: string,
    phone: string,
    social_links: string[],
    tags: string[],
    type: number,
  ) {
    let responseMsg = "сохранено";

    //create team
    await axios
      .post("api/events", {
        title: title,
        description: description,
        dateStart: dateStart,
        dateEnd: dateEnd,
        dateStartRegistration: dateStartRegistration,
        dateEndRegistration: dateEndRegistration,
        event_goal: event_goal,
        event_place: event_place,
        level: level,
        format: format,
        clarifying_direction: clarifying_direction,
        character_event: character_event,
        team_size: team_size,
        direction: direction,
        control: control,
        count_people: count_people,
        type_participation: type_participation,
        email: email,
        phone: phone,
        social_links: social_links,
        tags: tags,
        type: type,
      })
      .catch((err) => {
        if (err.response) {
          responseMsg = err.response.data.message[0];
        }
      });

    return responseMsg;
  }

  async function updateEvent(id: number, status: Status) {
    const res = await axios.put("api/events/" + id, {
      status: status,
    });

    return res.data;
  }

  return {
    CreateTeamsTest,
    fetchEvents,
    createEvent,
    updateEvent,

    layout,
  };
});
