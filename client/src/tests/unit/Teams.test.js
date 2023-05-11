// //import HelloWorld from '@/components/HelloWorld.vue'
// import { mount, shallowMount } from '@vue/test-utils'
// import ModalCreateTeam from '@/views/Modals/ModalCreateTeam.vue';
// import { setActivePinia, createPinia } from 'pinia'

// jest.mock("@/store/team_store", () => {
//   const { defineStore } = require("pinia");
//   const useTeamStore = defineStore("test", { state: () => ({ title: "xxxxx" }) });
//   return { useTeamStore };
// });

// jest.mock("@/store/user_store", () => {
//   const { defineStore } = require("pinia");
//   const useUserStore = defineStore("test", { state: () => ({ title: "xxxxx" }) });
//   return { useUserStore };
// });

// jest.mock("@/store/file_store", () => {
//   const { defineStore } = require("pinia");
//   const useFileStore = defineStore("test", { state: () => ({ title: "xxxxx" }) });
//   return { useFileStore };
// });



// describe('MessageToggle.vue', () => {

//   beforeEach(() => {
//     // creates a fresh pinia and make it active so it's automatically picked
//     // up by any useStore() call without having to pass it to it:
//     // `useStore(pinia)`
//     setActivePinia(createPinia())
//   })

//   const data = [{
//     value: 1,
//     name: "string"
//   }]
//   const wrapper = shallowMount(ModalCreateTeam,
//     {
//       global: { plugins: [createPinia()] }, props: {
//         isEditTeam: true, //если модальное окно вызвано для редактирования (не создание нового коллектива)
//         team: null
//       },
//       config: {
//         compilerOptions: {
//         //   isCustomElement: (tag) => tag.startsWith('v-select'),
//         //   isCustomElement: (tag) => tag.startsWith('font-awesome-icon'),
//         },
//       },
//     })

//   // it('check if button archive is clickable', async () => {

//   //   // console.log(wrapper.exists())
//   //   // let btnClose = wrapper.find('.btn-close')
//   //   // expect(wrapper.find('.btn-close').text()).toBe('Редактировать коллектив')

//   //   const closeBtn = wrapper.find('#btn-archive');
//   //   //  closeBtn.trigger('click');
//   //   expect(closeBtn.exists()).toBe(true)
//   //   // expect(wrapper.emitted('clicked')).toBeTruthy();
//   //   // expect(wrapper.emitted().close.length).toBe(1);

//   //   // Check if "clicked" event was emitted
//   //   // expect(wrapper.emitted('clicked')).toBeTruthy();
//   //   // expect(wrapper.text()).toMatch(data)
//   // })


// })



// // test("pinia in component test", () => {
// //   const wrapper = mount(HelloWorld, {
// //     global: { plugins: [createPinia()] },
// //   });
// //   expect(wrapper.text()).toBe("xxxxx");
// // });
// // import { shallowMount } from '@vue/test-utils'
// // import HelloWorld from '@/components/HelloWorld.vue'

// // describe('HelloWorld.vue', () => {
// //   it('renders props.msg when passed', () => {
// //     const msg = 'new message'
// //     const wrapper = shallowMount(HelloWorld, {
// //       props: { msg }
// //     })
// //     expect(wrapper.text()).toMatch(msg)
// //   })
// // })

