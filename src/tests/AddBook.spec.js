import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { mount, shallowMount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";
import { useBooksStore } from "@/stores/books";
import component from "../views/AddBook.vue";

describe("AddBook", () => {
  let wrapper;

  beforeEach(() => {
    // wrapper = mount(component);
    setActivePinia(createPinia());
    wrapper = shallowMount(component, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("mounts without errors", () => {
    console.log(wrapper)
    // expect(wrapper).toBeDefined();
    // expect(wrapper.exists()).toBe(true);
  });

  // it("renders all", () => {
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  // it("emits events", () => {
  //   const removeControl = wrapper.find(".card__delete");
  //   expect(removeControl.exists()).toBe(true);
  //   removeControl.trigger("click");
  //   // console.log(wrapper);
  // });
});

// describe("BookCard", () => {
//   it("mounts without errors", async () => {
//     const generalStore = useGeneralStore();
//     const wrapper = await mount(component, { generalStore });
//     expect(wrapper).toBeDefined();
//   });
// });

// describe("test is works", () => {
//   it("2 x 2 = 4", () => {
//     expect(2 * 2).toBe(4);
//   });
// });
