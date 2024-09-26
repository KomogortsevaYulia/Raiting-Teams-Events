import { Permissions } from './permissions';

// system roles
export enum Roles {
  ADMIN,
  LEADER_IRNITU,
  LEADER_DIRECTION,
  LEADER_TEAM,
  USER,
}

export const PermissionsRoles = {
  ADMIN: [Permissions.CAN_ALL],
  LEADER_IRNITU: [Permissions.CAN_ASSIGN_LEADER_DIRECTIONS],
  LEADER_DIRECTION: [
    Permissions.CAN_CREATE_TEAMS,
    Permissions.CAN_VIEW_REPORTS_DIRECTIONS,
    Permissions.CAN_VIEW_REPORTS_TEAMS,
    Permissions.CAN_EDIT_STATUS_EVENTS,
    Permissions.CAN_ASSIGN_LEADER_TEAM,
  ],
  LEADER_TEAM: [
    Permissions.CAN_CREATE_TEAM_ROLES,
    Permissions.CAN_CREATE_QUESTIONNAIRES,
    Permissions.CAN_EDIT_STATUS_REQUISITIONS,
    Permissions.CAN_EDIT_OWN_TEAMS,
  ],
  USER: [Permissions.CAN_CREATE_EVENTS, Permissions.CAN_VIEW_DIRECTIONS],
};
