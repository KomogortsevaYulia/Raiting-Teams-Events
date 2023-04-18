import { Direction } from "@/store/enums/enum_event"
import { DirectionName } from "@/store/enums/enum_teams"
import { defineStore } from "pinia"

export const useStatiscticLogicStore = defineStore("statisticLogic", () => {

   function directionInTeamsConvertToDirectionInEvents (direction: string){
    
        let directionInEvent = Direction.ALL
    
        switch (direction) {
            case DirectionName.KTD:
                directionInEvent =  Direction.KTD
                break
            case DirectionName.UD:
                directionInEvent =  Direction.UD
                break
            case DirectionName.SD:
                directionInEvent =  Direction.SD
                break
            case DirectionName.NID:
                directionInEvent =  Direction.NID
                break
            case DirectionName.OD:
                directionInEvent =  Direction.OD
                break
        }
    
        return directionInEvent
    
    }

    return {
        directionInTeamsConvertToDirectionInEvents
    }
})
