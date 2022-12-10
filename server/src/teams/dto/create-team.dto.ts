import { Team } from "../entities/team.entity";

export class CreateTeamDto {
    title : string;
    id_parent:Team[]
    image: string[];
    creation_date: Date;
    tags: string[];
    description: string;
    type_team: string;
    shortname:string;
}
