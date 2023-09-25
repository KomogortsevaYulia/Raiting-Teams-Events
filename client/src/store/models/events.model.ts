import { Status, Type } from "../enums/enum_event"

export class Event {

    type?: Type = Type.OUTSIDE
    status?: Status = Status.ACCEPTED
    direction?: any
    user_id?: number
    search_text?:string

    limit = 5
    offset = 0
}