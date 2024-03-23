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
          <span class="list__row__star" :class="{ selected: el.starred }" @click="toggleStar(el)">
            <font-awesome-icon :v-if="el.starred" :icon="['fas', 'star']" />
          </span>
          <div class="row-card">
            <span class="row-card__title">{{ el.title }}</span>
            <span class="row-card__points">{{ el.points }}</span>
          </div>
        </div>
      </div>
      <div v-if="disabled" class="mock">
        <div>у вас занятие<br>в аудитории<br>ФОК ИРНИТУ</div>
      </div>
    </div>
    <div class="class-list-card__footer-wrapper">
      <div class="class-list-card__footer">Выберите<br>аудиторию</div>
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

  function toggleStar(el: ClassListCardList) {
    el.starred = !el.starred;
  }
</script>

<style lang="scss" scoped>
  .class-list-card {
    --class-list-card__primary-color: #D22043;
    --class-list-card__secondary-color: #EBE8E8;
    --class-list-card__secondary-text-color: #747474;

    width: 33%;
    height: 365px;
    border: 1px solid var(--class-list-card__border-color);
    border-radius: 5px;
    margin-left: 25px;
    font-weight: 600;

    &.primary {
      --class-list-card__border-color: var(--class-list-card__primary-color);

      .class-list-card__header-wrapper {
        font-style: var(--font-family-title);
        font-weight: 600;
        color: #ffffff;
      }

      .class-list-card__footer-wrapper {
        font-style: var(--font-family-title);
        font-weight: 600;
        align-self: center;
        color: var(--class-list-card__primary-color);
      }
    }

    &.secondary {
      --class-list-card__border-color: var(--class-list-card__secondary-color);

      .class-list-card__header-wrapper {
        font-style: var(--font-family-title);
        font-weight: 600;
        color: var(--class-list-card__secondary-text-color);
      }

      .class-list-card__content {
        font-style: var(--font-family-title);
        font-weight: 600;
        height: 326px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .class-list-card__footer-wrapper {
        font-style: var(--font-family-title);
        font-weight: 600;
        display: none;
      }  
    }

    .class-list-card__header-wrapper {
      font-style: var(--font-family-title);
      font-weight: 600;
      font-size: 16px;
      border-bottom: 1px solid var(--class-list-card__border-color);
      background-color: var(--class-list-card__border-color);
      display: flex;
      height: 40px;
      align-items: center;

      .class-list-card__header__enum {
        margin-left: 15px;
      }
    }

    .class-list-card__header {
      font-style: var(--font-family-title);
      font-weight: 600;
      font-size: 100;
      width: 100%;
      text-align: center;
    }

    .class-list-card__content {
      font-style: var(--font-family-title);
      font-weight: 600;
      height: 260px;
      overflow-y: auto;
      scrollbar-width: thin;
    }

    .class-list-card__footer-wrapper {
      font-style: var(--font-family-title);
      font-weight: 600;
      height: 66px;
      text-align: center;
      text-transform: uppercase;
      border-top: 1px solid var(--class-list-card__border-color);
      align-items: center;
      display: flex;
      justify-content: center;
    }

    .list__row {
      font-style: var(--font-family-title);
      font-weight: 600;
      min-height: 35px;
      display: flex;
      align-items: center;
      margin-top: 15px;

      & + & {
        margin-top: 10px;
      }

      .row-card {
        font-style: var(--font-family-title);
        font-weight: 600;
        width: 100%;
        background-color: var(--class-list-card__secondary-color);
        border-radius: 5px;
        margin-right: 15px;
        padding: 9px 0;

        .row-card__title {
          display: inline-block;
          margin-left: 15px;
          width: 250px;
        }
        .row-card__points {
          float: right;
          margin-right: 10px;
        }
      }
      .list__row__star {
        cursor: pointer;
        margin: 0 15px;

        &.selected {
          color: yellow;
        }
      }
    }

    .mock {
      text-transform: uppercase;
      font-size: 20px;
      color: var(--class-list-card__secondary-text-color);
      text-align: center;
      font-weight: 600;
      line-height: 24px;
      letter-spacing: 0em;
    }
  }
</style>