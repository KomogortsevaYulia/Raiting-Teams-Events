# Здесь развернута клиентская часть приложения

## Запуск приложения
После клонирования репозитория делаем в консольке следующие штуки: 
1. npm install
2. .env.example -> .env (конфиг не отслеживается в гит)
3. vite.config.example.ts -> vite.config.ts (конфиг не отслеживается в гит)
4. npm run dev (можно указать дополнительные ключи: --port [n] --host)

## Дополнения для Visual Studio Code, которые я использую

1. vscode-icons (кудаж без него)
2. htmltagwrap (Жмакаю по выделенным штучкам ctrl + w и радуюсь жизни)
3. IntelliSense for CSS class names in HTML
4. Vue Language Features
5. Vue 3 Snippets
   p.s. на самом деле можно юзать какие душе удобно, просто такой мой стек

## Если будут какие-то проблемы с SASS/SCSS можно попытатья сделать это

Смысл в том, что на выходе у любого препроцессора идёт CSS'ка
и чтобы её получить можно вручную сделать кой-какую штуку,
а можно попробовать это: npm install -D sass-loader sass.
Подробнее здесь:
https://stackoverflow.com/questions/44019469/how-to-use-sass-scss-with-latest-vue-cli-starter-project

## Как я устроил работу на фронте

### Стек технологий

![Alt-стекТехнологий](https://psv4.userapi.com/c235031/u253826851/docs/d43/c283af0dd2c2/1.jpg?extra=NJ4c6Jn3tnGuCV7D_LemtEYq6zcWQvLYue3Byt2zvnHg71dQeRv4LfGm1kOYIYV1lXwMs1xHMa12NmIg7fZ-MiJ-5oLEwKuwyX2jsITQ-J9l5Rxbvcl1se_0PxUnikAslqpmq5LoZC_2XdV_VSDI6FNE)
По VUE 3 советую смотреть только довольно свежие туторы и читать документацию по Vue Composition API (ссылка: https://vuejs.org/guide/extras/composition-api-faq.html)

### БЭМ

Сайт планируется огромный, поэтому юзая SASS/SCSS предлагаю обзывать классы по БЭМу
На ютубе есть куча видосов и вообще методология довольно простая
(ссылка на почитать: https://habr.com/ru/post/203440/)
