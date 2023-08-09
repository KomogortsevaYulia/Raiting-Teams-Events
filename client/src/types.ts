export type Permission =
    // Отвественный за ИРНИТУ //
    | 'can create teams' //+
    | 'can view directions' //+
    | 'can view reports directions' //+
    | 'can view reports teams' //+
    | 'can edit status events'
    | 'can edit status requisitions'

    
    | 'can view reports'

    // Руководитель коллектива
    | 'can view teams reports'
    | ''

    // Руководитель коллектива
    | 'can view teams reports'
    | ''

    // Пользователь
    | 'can create events'
    ;