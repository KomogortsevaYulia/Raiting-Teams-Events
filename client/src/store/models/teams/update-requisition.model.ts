export interface RURequisition {
    id?: number;
    comment_leader?: string;
    status_name?: string;
    user_id?:number;
    team_id?:number;

//     addition for filter
    statuses?: string[];
    date_update_order?:string //'ASC' | 'DESC';
    fullname?: string;
}
