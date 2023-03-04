<script lang="ts">

import modal from '@/components/Modal.vue';

export default {
  name: 'ModalCreateTeam',
  components: {
    modal,
  },
  data() {
    return {
      isModalVisible: false,
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  },
};
</script>

<template>
  <div>
    <button type="button" class="btn" @click="showModal">
      Создать коллектив
    </button>

    <modal v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>
        <h3>Создать коллектив</h3>
      </template>
      <template v-slot:body>

        <!-- Это вся обертка -->
        <div class="wrapper-team">

          <div class="wrapper-team__create">
            <p>Прежде чем создать в системе новый коллектив, нужно
              утвердить его приказом!</p>

            <!-- Форма с полями для создания -->
            <form  class="form-team__create">
              <div class="create-filds">
                <div class="filds-area">
                  <input type="text" placeholder="Название коллектива" required>
                  <input type="text" placeholder="ФИО руководителя" required>
                  <textarea placeholder="Опишите проект" required />
                </div>
                <div class="fuck-off-btn">
                  <button >Создать коллектив</button>
                </div>
              </div>
              <div class="create-wrapper-img">

              </div>
            </form>
          
          </div>
        </div>


      </template>
    </modal>
  </div>
</template>

<style lang="scss">
@import '@/assets/teams/teams.scss';
</style>