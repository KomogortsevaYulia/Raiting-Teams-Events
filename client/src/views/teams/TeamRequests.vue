<script lang="ts" setup>

const props = defineProps<{
    users: any,
}>()

</script>

<template>
    <div v-if="users[0] == null" class="alert alert-warning" role="alert">
        Заявок нет
    </div>

    <div v-for="item in users">

        <div class="member-card py-2">
            <div class="row ms-lg-3">
                <div class="col-lg-2 d-flex col-md-12 justify-content-center mt-4">
                    <img class="member-image" src="../assets/icon/user.png" alt="" />
                </div>
                <div class="col-lg-10 col-md-12">
                    <div class="member-info">
                        <div class="col">
                            <div class="row ">
                                <h1>{{ item.user.fullname }}</h1>
                            </div>
                            <div class="row">
                                <h2>Дата последнего рассмотрения: {{ item.date_update }}</h2>
                            </div>
                            <div class="row">
                                <h2>Статус: {{ item.status }}</h2>
                            </div>
                            <div class="row d-flex justify-content-end">
                                <div class="member-buttons">
                                    <button class="btn button px-3">Отклонить</button>
                                    <button class="btn button  px-3">Принять</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.member-card {
    width: 100%;
    margin-bottom: 12px;
    background: rgb(243, 243, 243);
    border-radius: 25px 20px 20px 25px;

}

.member-info {
    width: 100%;
    padding: 19px 50px 19px 36px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.member-image {
    object-fit: cover;
    height: 89px;
    width: 89px;
    border-radius: 20px 0 0 20px;
}

.member-info h1 {
    color: black;
    font-family: 'Raleway', serif;
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 38px;
    padding-bottom: 10px;
}

.member-info h2 {
    color: rgba(90, 90, 90, 1);
    font-family: 'Inter', serif;
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 24px;
}

.member-buttons {
    display: flex;
    justify-content: end;
}

.member-buttons .button {
    background-color: rgba(217, 217, 217, 1);
    color: rgba(102, 102, 102, 1);

    width: 270px;
    padding: 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-family: 'Inter', serif;
    font-style: normal;
    font-weight: 400;

    line-height: 24px;
    margin-left: 15px;
}
</style>