import { defineStore } from "pinia";
import axios from "axios";
import { Direction } from "./enums/enum_event";
import { DirectionName } from "./enums/enum_teams";

export const useEventStore = defineStore("events", () => {

  async function fetchEvents(): Promise<any> {
    const res = await axios.get('api/events/external')
    const data = res.data

    return data
  }

  async function fetchEventById(id: number, dateStart: Date, dateEnd: Date, level: number = 0, type: number = 0
  ): Promise<any> {

    let lvl = level != 0 ? level : null
    let tp = type != 0 ? type : null

    const res = await axios.get('api/events', {
      params: {
        id: id,
        level: lvl, type: tp,
        dateStart: dateStart.toISOString(), dateEnd: dateEnd.toISOString()
      }
    })

    const data = res.data[0]

    return data[0]
  }

  async function getEventsViaJournalsByTeam(teamId: number, dateStart: Date, dateEnd: Date, 
    type: number = 0, level: number = 0): Promise<any> {

    let lvl = level != 0 ? level : null
    let tp = type != 0 ? type : null

    const res = await axios.get('api/events/events_of_team/' + teamId, {
      params: {
        level: lvl, type: tp,
        dateStart: dateStart.toISOString(), dateEnd: dateEnd.toISOString()
      }
    })

    const data = res

    return data
  }

  // найти мероприятия по направлению
  async function getEventsByDirection(direction: number = 0,
    dateStart: Date, dateEnd: Date, level: number = 0, type: number = 0
  ): Promise<any> {

    let res = null

    let lvl = level != 0 ? level : null
    let tp = type != 0 ? type : null
    let dr = direction != 0 ? direction : null


    //need get all directions
    res = await axios.get('api/events/', {
      params: {
        direction: dr, level: lvl, type: tp,
        dateStart: dateStart.toISOString(), dateEnd: dateEnd.toISOString()
      }
    })

    const data = res.data

    return data
  }


  async function getReportEventsOfDirection(direction: number = 0,
    dateStart: Date, dateEnd: Date, level: number = 0, type: number = 0
  ) {

    let res = null

    let lvl = level != 0 ? level : null
    let tp = type != 0 ? type : null
    let dr = direction != 0 ? direction : null


    //need get all directions
    res = await axios.get('api/uploads/excel/events_direction', {
      params: {
        direction: dr, level: lvl, type: tp,
        dateStart: dateStart.toISOString(), dateEnd: dateEnd.toISOString()
      },
      responseType: "arraybuffer"
    })


    return res
  }

  const menu_items = [
    {
      id: 1, title: 'Формат проведения', menu_types: [
        { id: 1, title: 'Online' },
        { id: 2, title: 'Offline' },
      ]
    },
    {
      id: 2, title: 'Уровень', menu_types: [
        { id: 1, title: 'Внутривузовский' },
        { id: 2, title: 'Межвузовский' },
        { id: 3, title: 'Региональный' },
        { id: 4, title: 'Всероссийский' },
      ]
    },
    {
      id: 3, title: 'Институт', hidden: true, menu_types: [
        { id: 1, title: 'Авиамашиностроения и транспорта' },
        { id: 2, title: 'Архитектуры, строительства и дизайна' },
        { id: 3, title: 'Высоких технологий' },
        { id: 4, title: 'Информационных технологий и анализа даных' },
        { id: 5, title: 'Квантовой физики' },
        { id: 6, title: 'Лингвистики и межкультурной коммуникации' },
        { id: 7, title: 'Недропользования' },
        { id: 8, title: 'Экономики, управления и права' },
        { id: 9, title: 'Энергетики' },
        { id: 10, title: 'БРИКС' },
      ]
    },
    {
      id: 4, title: 'Курс', hidden: true, menu_types: [
        { id: 1, title: '1 курс' },
        { id: 2, title: '2 курс' },
        { id: 3, title: '3 курс' },
        { id: 4, title: '4 курс' },
        { id: 5, title: '5 курс' },
        { id: 6, title: 'Магистратура' },
      ]
    }
  ]

  return {
    menu_items,
    fetchEvents,
    fetchEventById,
    getEventsByDirection,
    getReportEventsOfDirection,
    getEventsViaJournalsByTeam
  }
})