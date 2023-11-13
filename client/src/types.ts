export type Permission =
    // admin
    | 'can all'

    // Отвественный за ИРНИТУ
    | 'can assign direction leaders' //+

    // Отвественный по направлению
    // also can assign leader of team'
    | 'can assign teams leaders' //+
    | 'can create teams' //+
    | 'can view directions' //+
    | 'can view reports directions' //+
    | 'can view reports teams' //+
    | 'can view reports'
    | 'can edit status events'

  // Руководитель коллектива
  | "can edit own teams" //+
  | "can edit status requisitions"
  | "can create questionnaires"
  | "can create team roles"
  | ""

  // Руководитель коллектива
  | "can view teams reports"

  // Пользователь
  | "can create events"
  | "can edit own events";
