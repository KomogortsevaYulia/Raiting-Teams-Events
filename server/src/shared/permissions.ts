export enum Permissions {
  // ADMIN
  CAN_ALL = 'can all',

  // RESP IRNITU
  CAN_ASSIGN_LEADER_DIRECTIONS = 'can assign leader directions',

  // RESP DIRECTION
  CAN_CREATE_TEAMS = 'can create teams',
  CAN_VIEW_REPORTS_DIRECTIONS = 'can view reports directions',
  CAN_VIEW_REPORTS_TEAMS = 'can view reports teams',
  // CAN_VIEW_REPORTS = 'can view reports',
  CAN_EDIT_STATUS_EVENTS = 'can edit status events',
  CAN_ASSIGN_LEADER_TEAM = 'can assign leader teams',

  // LEADER TEAM
  CAN_EDIT_OWN_TEAMS = 'can edit own teams',
  CAN_EDIT_STATUS_REQUISITIONS = 'can edit status requisitions',
  CAN_CREATE_QUESTIONNAIRES = 'can create questionnaires',
  CAN_CREATE_TEAM_ROLES = 'can create team roles',

  // USER
  CAN_CREATE_EVENTS = 'can create events',
  CAN_VIEW_DIRECTIONS = 'can view directions',
}
