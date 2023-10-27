import { Permissions } from './permissions';

// system roles
export enum Roles {
  ADMIN,
  LEADER_IRNITU,
  LEADER_DIRECTION,
  LEADER_TEAM,
  USER,
}

//  roles for fast assigning permissions
const PERMISSIONS_USER = [
  Permissions.CAN_CREATE_EVENTS,
  Permissions.CAN_VIEW_DIRECTIONS,
];

const PERMISSIONS_LEADER_TEAM = [
  Permissions.CAN_CREATE_TEAM_ROLES,
  Permissions.CAN_CREATE_QUESTIONNAIRES,
  Permissions.CAN_EDIT_STATUS_REQUISITIONS,
  Permissions.CAN_EDIT_OWN_TEAMS,
  ...PERMISSIONS_USER,
];

const PERMISSIONS_LEADER_DIRECTION = [
  Permissions.CAN_CREATE_TEAMS,
  Permissions.CAN_VIEW_REPORTS_DIRECTIONS,
  Permissions.CAN_VIEW_REPORTS_TEAMS,
  Permissions.CAN_EDIT_STATUS_EVENTS,
  Permissions.CAN_ASSIGN_LEADER_TEAM,
  ...PERMISSIONS_LEADER_TEAM,
];

export const PermissionsRoles = {
  ADMIN: [Permissions.CAN_ALL],
  LEADER_IRNITU: [
    Permissions.CAN_ASSIGN_LEADER_DIRECTIONS,
    ...PERMISSIONS_LEADER_DIRECTION,
  ],
  LEADER_DIRECTION: [...PERMISSIONS_LEADER_DIRECTION],
  LEADER_TEAM: [...PERMISSIONS_LEADER_TEAM],
  USER: [...PERMISSIONS_USER],
};
