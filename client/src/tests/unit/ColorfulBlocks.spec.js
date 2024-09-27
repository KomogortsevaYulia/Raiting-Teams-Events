import { shallowMount } from "@vue/test-utils";
import ColorfulBlocks from "@/components/Charts/ColorfulBlsocks.vue";

describe("ColorfulBlocks.vue", () => {
  const data = [
    {
      value: 1,
      name: "число мероприятий",
    },
  ];

  const wrapper = shallowMount(ColorfulBlocks, {
    props: {
      data: data,
    },
  });

  it("проверить совпадает ли число созданных блоков с числом поданных даннных", async () => {
    const titleBlock = wrapper.findAll(".title");
    const count = titleBlock.length;
    expect(count).toBe(1); // assert that there are 3 elements with the class "my-class"
  });
});

// test("pinia in component test", () => {
//   const wrapper = mount(HelloWorld, {
//     global: { plugins: [createPinia()] },
//   });
//   expect(wrapper.text()).toBe("xxxxx");
// });
// import { shallowMount } from '@vue/test-utils'
// import HelloWorld from '@/components/HelloWorld.vue'

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       props: { msg }
//     })
//     expect(wrapper.text()).toMatch(msg)
//   })
// })
