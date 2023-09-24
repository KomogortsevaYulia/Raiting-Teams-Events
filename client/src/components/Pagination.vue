
<template>
    <!-- current {{ current }}
    maxPage {{ maxPage }}
    startPage {{ startPage }}
    endPage {{ endPage }} -->
    <div class="my-4">
        <nav aria-label="Pagination">
            <ul class="pagination">
                <!-- prev page -->
                <li class="page-item">
                    <a class="page-link" @click="changePage(current - 1)" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <!-- start page -->
                <li v-if="startPage >= 2" class="page-item">
                    <a class="page-link" href="#" @click="changePage(1)">1</a>
                </li>
                <li v-if="startPage >= 2" class="page-item">
                    <a class="page-link">...</a>
                </li>
                <!-- pages -->
                <li v-for="index in range(startPage, endPage)" :key="index" class="page-item" @click="changePage(index)">
                    <a :class="[{ 'active-page': current == index }, 'page-link']" href="#">{{ index }}</a>
                </li>
                <!-- end page -->
                <li v-if="endPage < maxPage" class="page-item">
                    <a class="page-link">...</a>
                </li>
                <li v-if="endPage < maxPage" class="page-item">
                    <a class="page-link" href="#" @click="changePage(maxPage)">{{ maxPage }}</a>
                </li>
                <!-- nest page -->
                <li class="page-item">
                    <a class="page-link" @click="changePage(current + 1)" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';

const props = defineProps<{
    visiblePages: number,           //сколько страниц для переключения может видеть юзер
    maxPage: number,                //макс число страниц
    handleEventChangePage: Function,//обработка события при переходе на другую страницу
}>()

const current = ref(1)  //текущая  страница

const startPage = ref(1)
const endPage = ref(1)

onBeforeMount(() => {
    // запустить на всякий случай если было maxPage быстро изменено
    setEndStartPages()
})

watch(() => props.maxPage, async (prev) => {
    changePage(1)
})

// изменить страницу
function changePage(goToPage: number) {

    if (goToPage <= props.maxPage && goToPage >= 1)
        current.value = goToPage

    setEndStartPages()
    // передать обработку смены страницы выше  
    props.handleEventChangePage(current.value)
}

// задать начальную и конечную страницы
function setEndStartPages() {
    // start page
    const halfPages = Math.floor(props.visiblePages / 2)
    if (current.value <= halfPages) {
        startPage.value = 1
    } else {
        startPage.value = current.value - halfPages
    }

    // end page
    if (halfPages + current.value <= props.maxPage) {
        endPage.value = halfPages + current.value
    } else {
        endPage.value = props.maxPage
    }
}

// вывод номеров страниц пагинации
function range(from: number, to: number) {
    return Array.from({ length: to - from + 1 }, (_, index) => from + index);
}


</script>

<style lang="scss" scoped>
.pagination {
    .active-page {
        background-color: var(--main-color);
       
        border: none;

    }


    .page-link {
        color: black;

        &:active {
            background-color: var(--main-color-hover);
        }

        &:focus {
            box-shadow: none;
            border: 1px solid var(--main-color-hover);
        }
    }

}
</style>