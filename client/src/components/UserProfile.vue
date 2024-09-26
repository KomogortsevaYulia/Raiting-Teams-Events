<template>
  <section class="DropdownWrapper__menu" v-click-outside="ClickOutside">
    <div
      class="dropDownMenuButton align-items-center d-flex px-3 text-center"
      @click="openClose"
      tabindex="0"
    >
      <label class="pe-3">{{ permissions_store.fullname }}</label>

      <font-awesome-icon icon="circle-user" class="fa-2x" />
      <!-- Сюда аватарку пихать надо -->
    </div>
    <section class="dropdownMenu" v-if="isOpen">
      <RouterLink
        @click="openClose"
        v-if="permissions_store.isLogged"
        :to="'/personal/' + username"
      >
        <p>
          <font-awesome-icon icon="user" />
          Личный кабинет
        </p>
      </RouterLink>
      <RouterLink
        @click="openClose"
        v-if="permissions_store.isLogged"
        :to="{
          name: 'Requests',
          query: { user_id: permissions_store.user_id },
        }"
      >
        <p>
          <font-awesome-icon icon="envelope" />
          Мои заявки
        </p>
      </RouterLink>
      <p v-if="permissions_store.isLogged" @click.prevent="OnExitSubmit">
        <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
        Выход
      </p>
    </section>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { RouterLink } from "vue-router";
import { usePermissionsStore } from "@/store/permissions_store";
import { ref } from "vue";

const permissions_store = usePermissionsStore();

const { username } = storeToRefs(permissions_store);

const isOpen = ref(false);

function openClose() {
  isOpen.value = !isOpen.value;
}

function ClickOutside() {
  isOpen.value = false;
}

function OnExitSubmit() {
  permissions_store.logout();
}
</script>

<style lang="scss" scoped>
@import "@/assets/globals.scss";

.DropdownWrapper__menu {
  z-index: 1;
  position: relative;

  .dropDownMenuButton {
    cursor: pointer;
    border-radius: 25px;
    transition: all 0.2s ease;
    padding: 0.35rem;

    * {
      color: var(--main-navigation-color);
    }

    label {
      cursor: pointer;
      font-size: 16px;
    }

    img {
      border-radius: 100%;
    }

    &:hover {
      border-radius: 25px;
      background-color: rgb(220, 239, 255);
    }

    &:active {
      background-color: #d1e6ff;
    }

    &:focus {
      background-color: #d1e6ff;
    }
  }

  .dropdownMenu {
    margin-top: 0.75rem;
    position: absolute;
    display: flex;
    width: 100%;
    flex-direction: column;
    border-radius: 10px;
    background-color: white;
    transition: 0.2s ease;
    padding: 0.75rem;
    box-shadow: var(--box-shadow);

    p {
      cursor: pointer;
      font-size: 16px;
      color: black;
      padding: 0.5rem;
      margin: 0;

      &:hover {
        background-color: var(--second-color);
        border-radius: 5px;
        transition: 0.2s ease;
        color: white;
      }
    }
  }
}
</style>
