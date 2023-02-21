import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
// import { createTestingPinia } from "@pinia/testing";
import component from "../components/BookCard.vue";

describe("Books page", () => {
  it("mount without errors", () => {
    const card = { formats: {} };
    const wrapper = mount(component, { props: { card } });
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });

  it("emits events", () => {
    const card = { formats: {} };
    const wrapper = mount(component, { props: { card } });
    const removeControl = wrapper.find(".card__delete");
    expect(removeControl.exists()).toBe(true);
    console.log(wrapper.emitted());
  });
});
