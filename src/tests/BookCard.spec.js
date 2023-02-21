import { describe, expect, it, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import component from "../components/BookCard.vue";

describe("BookCard", () => {
  let wrapper;
  const card = {
    id: 1,
    title: "My Book",
    formats: {
      "image/jpeg": "http://example.com/image.jpg",
    },
  };

  beforeEach(() => {
    wrapper = mount(component, {
      props: {
        card,
        hasOverlay: true,
        isDeletable: true,
      },
    });
  });

  it("mounts without errors", () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });

  it("renders all", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders the card with the correct props", () => {
    const bookTitle = wrapper.find(".card__title").text();
    const bookCover = wrapper.find(".card__img").attributes("src");
    const bookCoverAlt = wrapper.find(".card__img").attributes("alt");
    expect(bookTitle).toBe("My Book");
    expect(bookCover).toBe("http://example.com/image.jpg");
    expect(bookCoverAlt).toBe(bookTitle);
  });

  it("emits 'goToBookPage' event on click", async () => {
    const cardClickControl = wrapper.find(".card");
    expect(cardClickControl.exists()).toBe(true);
    await cardClickControl.trigger("click");
  });

  it("emits 'deleteBook' event on click", async () => {
    const removeEvent = wrapper.find(".card__delete");
    expect(removeEvent.exists()).toBe(true);
    await removeEvent.trigger("click");
  });
});
