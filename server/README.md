## Description

На заметку:
пароль во всех учетках "123", заходим по email
![image](https://user-images.githubusercontent.com/74527737/206859237-c0f4e73c-b856-44a4-95d2-5fcf45824bb1.png)


## Установка

```bash
$ npm install

$ npm install --save @nestjs/typeorm typeorm postgres
```

#### Так же необходимо иметь PostgreSQL с развернутым бэкапом БД
backup.sql файл в папке server

1. Создаем пустую БД с названием raiting_teams_events

2. Правой кнопкой кликаем на базу и выбираем PSQL Tool

3. И там пишем команду

     \i 'd:/пусть/к/файлу/бекапу.sql'

     Наклон слешей должен быть вправо

     Например:

     \i 'C:/Users/Yulia/Study/Raiting-Teams-Events/backup.sql'

## Running the app



```bash
# watch mode
$ npm run start:dev

```

## Создание бэкапа

Как сделать из pgAdmin

1. Тыкаем на базу backup
2. Выбираем формат Plain
3. Выбираем путь к файлу (будем делать sql файл)
4. Во вкладке options включаем Include DROP DATABASE statement
5. Запускаем Backup

