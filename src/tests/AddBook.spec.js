import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";
import { useBooksStore } from "@/stores/books";

import component from "../views/AddBook.vue";

describe("AddBook", () => {
  let wrapper;
  let booksStore = null;
  setActivePinia(createPinia());
  booksStore = useBooksStore();

  beforeEach(() => {
    wrapper = mount(component, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
        mocks: [booksStore],
        stubs: ["RouterLink"],
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("mounts without errors", () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });

  it("renders all", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render form inputs and button", () => {
    // Assert form inputs
    expect(wrapper.find('[data-test="book-title-input"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="book-cover-input"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="subjects-input"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="bookshalves-input"]').exists()).toBe(true);

    // Assert button
    expect(wrapper.find(".add-form__button").exists()).toBe(true);
  });

  it('should add new author when clicking "Add another author" button', async () => {
    const nameInput = wrapper.find('[data-test="author-name-input"]');
    const birthInput = wrapper.find('[data-test="author-birth-input"]');
    const addAuthorBtn = wrapper.find(".add-form__add-author");

    const addAuthorToNewBook = vi.fn(() => []);

    // Fill in author fields
    await nameInput.setValue("John Doe");
    await birthInput.setValue("1990");

    // Click "Add another author" button
    await addAuthorBtn.trigger("click");
    addAuthorToNewBook.mockReturnValue([
      { name: "John Doe", birth_year: "1990" },
    ]);

    expect(addAuthorToNewBook()).toStrictEqual([
      { name: "John Doe", birth_year: "1990" },
    ]);

    // Fill in second author fields
    await nameInput.setValue("Agent Smith");
    await birthInput.setValue("1968");
    await addAuthorBtn.trigger("click");
    addAuthorToNewBook.mockReturnValue([
      { name: "John Doe", birth_year: "1990" },
      { name: "Agent Smith", birth_year: "1968" },
    ]);

    expect(addAuthorToNewBook()).toStrictEqual([
      { name: "John Doe", birth_year: "1990" },
      { name: "Agent Smith", birth_year: "1968" },
    ]);
  });
});
