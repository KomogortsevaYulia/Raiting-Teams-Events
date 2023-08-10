<script setup lang="ts">

const props = defineProps<{
    team: any,           //коллектив
   
}>()


const newsList = [
    {
        id: 1,
        title: 'Выступление на встрече',
        description: '28 марта прошла встреча с Жугдэрдэмидийн Гуррагча, президентом Общества "Монголия - Россия", героем Советского Союза, первым космонавтом Монгольской Народной Республики (МНР).',
        imageUrl: 'https://sun9-80.userapi.com/impg/v16lLdu-5nAWk8CFWXfgBTKbry5ySAaxpg07pA/_VQyOnsIS2U.jpg?size=1600x1067&quality=95&sign=29b4aa0494f355212449ccb5b2d438d4&type=album'
    },
    {
        id: 2,
        title: 'Гала-концерт',
        description: '18 марта на сцене ИРНИТУ состоялся гала-концерт межрегионального многожанрового музыкального конкурса, посвящённого 75-летию со дня рождения поэта, композитора, телеведущего, Народного артиста России Геннадия Дмитриевича Заволокина.',
        imageUrl: 'https://sun9-72.userapi.com/impg/3fBWXOId3AxVXmsor6HR50f5IOf7A0K-sp-iPA/GMnrC6OqDew.jpg?size=2560x1707&quality=95&sign=6a57308ab9691669faf9452b1f3e1f85&type=album'
    },
    {
        id: 3,
        title: 'Выступление на ректорском приеме',
        description: 'Ректорский прием, посвященный международному женскому дню, состоялся 7 марта. Наш коллектив также принял участие в концертной программе и поздравил прекрасную половину нашего университета с праздником!',
        imageUrl: 'https://sun9-35.userapi.com/impg/qo49V2NSbiMOrTTqwmnJoffy7v7tzMv3pPs6Bg/44aBwrBj2Ak.jpg?size=1280x853&quality=95&sign=f8ced23a9edd565a4e14e94858a709c0&type=album'
    },
]

</script>

<template>
    <!-- Блок с НОВОСТЯМИ -->
    <div class="news-panel">
        <div class="news-card" v-for="news in newsList" :key="news.id">
            <div class="image-container">
                <img :src="news.imageUrl">
            </div>
            <div class="text-container">
                <h2 class="title">{{ news.title }}</h2>
                <label class="description">{{ news.description }}</label>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.news-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;

    .news-card {
        display: flex;
        align-items: center;
        height: 230px;
        // width: 80%;
        // background-color: #B7EAED;
        // border-style: #000000,10px;
        border: 2px solid #B7EAED;

        margin-bottom: 20px;
        border-radius: 25px;

        h2 {
            padding: 0;
            margin: 0;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            font-weight: inherit;
            font-size: 32px;
        }

        img {
            height: 225px;
            width: 225px;
            border-radius: 25px;
            object-fit: cover;
            overflow: hidden;
        }

        .title {
            margin-top: 0;
        }

        .description {
            margin-bottom: 0;
        }

        .text-container {
            flex: 1;
            padding: 25px;
        }
    }

}
</style>