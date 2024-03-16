<template>
  <div class="class-list-card" :class="disabled? 'secondary' : 'primary'">
    <div class="class-list-card__header-wrapper">
      <span class="class-list-card__header__enum">{{ num }}</span>
      <span class="class-list-card__header">
        {{ time }}
      </span>
    </div>
    <div class="class-list-card__content">
      <div v-if="!disabled" class="class-list-card__list">
        <div class="list__row" v-for="(el, i) in list" :key="i">
          <font-awesome-icon :icon="['fas', 'star']" />
          <div class="row-card">
            <span>{{ el.title }}</span>
            <span>{{ el.points }}</span>
          </div>
        </div>
      </div>
      <div v-if="disabled" class="mock">
        <div>у вас занятие</div>
        <div>в аудитории</div>
        <div>ФОК ИРНИТУ</div>
      </div>
    </div>
    <div class="class-list-card__footer-wrapper">
      <div class="class-list-card__footer">Выберите аудиторию</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { ClassListCardList } from './ClassListCard.interface';

  defineProps<{
    disabled: boolean | undefined;
    num: number | undefined;
    time: string;
    list: ClassListCardList[];
  }>();
</script>

<style lang="scss" scoped>
  .class-list-card {
    --class-list-card__primary-color: #D22043;
    --class-list-card__secondary-color: #EBE8E8;
    --class-list-card__secondary-text-color: #747474;

    width: 400px;
    height: 365px;
    border: 1px solid var(--class-list-card__border-color);

    &.primary {
      --class-list-card__border-color: var(--class-list-card__primary-color);

      .class-list-card__header-wrapper {
        color: #ffffff;
      }

      .class-list-card__footer-wrapper {
        color: var(--class-list-card__primary-color);
      }
    }

    &.secondary {
      --class-list-card__border-color: var(--class-list-card__secondary-color);

      .class-list-card__header-wrapper {
        color: var(--class-list-card__secondary-text-color);
      }

      .class-list-card__content {
        height: 326px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .class-list-card__footer-wrapper {
        display: none;
      }  
    }

    .class-list-card__header-wrapper {
      border-bottom: 1px solid var(--class-list-card__border-color);
      background-color: var(--class-list-card__border-color);
      display: flex;
      height: 40px;
    }

    .class-list-card__header {
      width: 100%;
      text-align: center;
    }

    .class-list-card__content {
      height: 260px;
      overflow-y: auto;
    }

    .class-list-card__footer-wrapper {
      height: 66px;
      border-top: 1px solid var(--class-list-card__border-color);
    }

    .list__row {
      height: 35px;
      display: flex;
      align-items: center;
      
      & + & {
        margin-top: 10px;
      }

      .row-card {
        width: 100%;
        background-color: var(--class-list-card__secondary-color);
      }
    }

    .mock {
      text-transform: uppercase;
    }
  }
</style>