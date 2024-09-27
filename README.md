# Система управления коллективами и мероприятиями для рейтинговой стипендии в ИРНИТУ

Проект создается в рамках проектной деятельности и состоит из : 

* Модуль Коллективы - создание коллективов, регистрация участников, отслеживание внутренней деятельности

* Модуль Мероприятия - автоматизация процессов проведения мероприятий ИрНИТУ


## Описание

![image](https://user-images.githubusercontent.com/74527737/207023057-bb733925-d987-4d67-adaa-3d1333abf7f4.png)


## Стэк технологий
<div>
<img src="https://github.com/devicons/devicon/blob/master/icons/postgresql/postgresql-original-wordmark.svg" title="CSS3" alt="CSS" width="70" height="70"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/nestjs/nestjs-plain-wordmark.svg" title="CSS3" alt="CSS" width="70" height="70"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original-wordmark.svg" title="NodeJS" alt="NodeJS" width="70" height="70"/>&nbsp;    
<img src="https://avatars.githubusercontent.com/u/20165699?s=280&v=4" title="NodeJS" alt="NodeJS" width="70" height="70"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/vuejs/vuejs-original-wordmark.svg" title="NodeJS" alt="NodeJS" width="70" height="70"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/sass/sass-original.svg" title="CSS3" alt="CSS" width="70" height="70"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/typescript/typescript-original.svg" title="CSS3" alt="CSS" width="70" height="70"/>&nbsp;
<img src="https://pinia.vuejs.org/logo.svg" title="CSS3" alt="CSS" width="70" height="70"/>&nbsp;
<img src="https://user-images.githubusercontent.com/7110136/29002858-a09570d2-7ab4-11e7-8faa-5dd6d4458b0d.png" title="CSS3" alt="CSS" width="70" height="70"/>&nbsp;
  <img src="https://camo.githubusercontent.com/b0c61a6f54e70a0162e1ef05b04f1080ba988fdb78821dd16664568e7fef02d2/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f7468756d622f662f66312f566974656a732d6c6f676f2e7376672f3130333970782d566974656a732d6c6f676f2e7376672e706e67" title="CSS3" alt="CSS" width="70" height="70"/>&nbsp;
  <img src="https://icons-for-free.com/iconfiles/png/512/Swagger-1324888766897607015.png" title="CSS3" alt="CSS" width="70" height="70"/>&nbsp;
</div>

## База знаний
https://github.com/KomogortsevaYulia/knowledge_base_rating

## Проект находится в стадии реализации
## Тег-система
теги хранятся в файле release-tags.json

**ВАЖНО**

при обновлении основной ветки 

**не забывайте обновлять этот файл по методологии semantic versioning (semver)**

коммитом с паттерном "chore(release tags): ${tag}"
это необходимо для контроля версий, в большую часть на vds/vps при обновлении деплоя
## CI/CD проекта
нельзя мержить в мастер беспорядочно

## CI
### ветки
- **под каждую задачу создаётся своя ветка** с её тегом и индентификатором или семантическим обозначением
примеры: 
- fix/111-task
- feature/111-task
- hotfix/111-task
- hotfix/task

соблюдать паттерн названия веток нужно, так с неправильным названием вы наткнётесь на CI, у нас husky

он попросит вас сменить название ветки, это делается `git checkout -b branch_name`

после этой команды вы сделаете новую ветку от текущего коммита, но с другим названием, проблем не будет

### коммиты
также CI система проверяет валидность коммитов, есть заданные тэги коммитов и длина

TODO: подключить линтёры (если в проекте падает линтёр, то без фикса вас не пустит)
TODO: подключить git-cz (удобная обёртка для коммитов)

## цикл выполнения задач
состоит из следующих этапов:

```
открытая задача -> 
задача в процессе -> 
ревью выполненной задачи -> 
тестирование -> 
(получение аппрува)
(если бранч устарел) обновление ветки основной веткой -> 
(если бранч задел тег) обновление тэгов -> 
мёрж ветки в мастер (можно через GUI github'а)
```

данная система обновления **позволит создать понятный CI/CD** проекта

кроме того, позволит поддерживать **мастер в стабильном состоянии**