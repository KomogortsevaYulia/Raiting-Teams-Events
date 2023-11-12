<template>
<!--  current {{ current }}-->
<!--      maxPage {{ maxPage }}-->
<!--      startPage {{ startPage }}-->
<!--      endPage {{ endPage }}-->
<!--    visiblePages {{ visiblePages }}-->
<!--    halfPages = {{ Math.floor(props.visiblePages / 2)}}-->
  <div class="my-4 container-pagination">
    <div class="wrapper-pagination border-block">
      <nav aria-label="Pagination">
        <div class="pagination row">
          <!-- prev page -->
          <div class="page-item col-auto">
            <a
              class="page-link-custom"
              @click="changePage(current - 1)"
              href="#"
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </div>
          <!-- start page -->
          <div v-if="startPage >= 2" class="page-item col-auto">
            <a class="page-link-custom" href="#" @click="changePage(1)">1</a>
          </div>
          <div v-if="startPage >= 2" class="page-item col-auto">
            <a class="page-link-custom">...</a>
          </div>
          <!-- pages -->
          <div
            v-for="index in range(startPage, endPage)"
            :key="index"
            class="page-item col-auto"
            @click="changePage(index)"
          >
            <a
              :class="[
                { 'active-page': current == index },
                'page-link-custom custom-border',
              ]"
              href="#"
              >{{ index }}</a
            >
          </div>
          <!-- end page -->
          <div v-if="endPage < maxPage" class="page-item col-auto">
            <a class="page-link-custom">...</a>
          </div>
          <div v-if="endPage < maxPage" class="page-item col-auto">
            <a class="page-link-custom" href="#" @click="changePage(maxPage)">{{
              maxPage
            }}</a>
          </div>
          <!-- nest page -->
          <div class="page-item col-auto">
            <a
              class="page-link-custom"
              @click="changePage(current + 1)"
              href="#"
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from "vue";

const props = defineProps<{
  visiblePages: number; //сколько страниц для переключения может видеть юзер
  maxPage: number; //макс число страниц
  handleEventChangePage: Function; //обработка события при переходе на другую страницу
}>();

const current = ref(1); //текущая  страница

const startPage = ref(1);
const endPage = ref(1);

onBeforeMount(() => {
  // запустить на всякий случай если было maxPage быстро изменено
  setEndStartPages();
});

watch(
  () => props.maxPage,
  async (prev) => {
    changePage(1);
  },
);

// изменить страницу
function changePage(goToPage: number) {
  if (goToPage <= props.maxPage && goToPage >= 1) current.value = goToPage;

  setEndStartPages();
  // передать обработку смены страницы выше
  props.handleEventChangePage(current.value);
}

// задать начальную и конечную страницы
function setEndStartPages() {
  // start page
  let halfPages = Math.floor(props.visiblePages / 2);

  if (current.value <= halfPages) {
    startPage.value = 1;
  } else {
    startPage.value = current.value - halfPages;
  }

  // end page
  if (halfPages + current.value <= props.maxPage) {
    endPage.value = halfPages + current.value;
  } else {
    endPage.value = props.maxPage;
  }
}

// вывод номеров страниц пагинации
function range(from: number, to: number) {
  return Array.from({ length: to - from + 1 }, (_, index) => from + index);
}
</script>

<style lang="scss" scoped>
@mixin item-border {
  border-bottom: 3px solid var(--main-color) !important;
}

.container-pagination {
  display: flex;
  justify-content: center;

  .wrapper-pagination {
    background-color: white;
  }
}

.pagination {
  margin: 0;

  .active-page {
    @include item-border();
  }

  .page-item {
    padding: 10px 0;

    .page-link-custom {
      padding: 10px 15px;
      color: black;
    }

    &:last-child .page-link-custom {
      border-radius: 0px 10px 10px 0px;

      &:hover {
        color: var(--main-color);
      }
    }

    &:first-child .page-link-custom {
      border-radius: 10px 0px 0px 10px;

      &:hover {
        color: var(--main-color);
      }
    }
  }

  .custom-border {
    &:active {
      @include item-border();
    }

    &:hover {
      @include item-border();
    }
  }
}
</style>
