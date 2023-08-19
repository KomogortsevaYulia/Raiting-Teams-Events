export type Permission =
    // admin
    | 'can edit all events'
    | 'can edit all teams'
    // Отвественный за ИРНИТУ //
    | 'can create teams' //+
    | 'can view directions' //+
    | 'can view reports directions' //+
    | 'can view reports teams' //+
    | 'can view reports'
    | 'can edit status events'


    // Руководитель коллектива
    | 'can view teams reports'
    | 'can edit own teams' //+
    | 'can edit status requisitions'
    | 'can create questionnaires'
    | 'can create team roles'
    | ''

    // Руководитель коллектива
    | 'can view teams reports'
    | ''

    // Пользователь
    | 'can create events'
    | 'can edit own events'
    ;