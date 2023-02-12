import { reactive } from "vue";
import { defineStore } from "pinia";
import { useBooksStore } from "./books";

export const useAuthorsStore = defineStore("authors", () => {
  const booksStore = useBooksStore();

  const authors = reactive([]);

  async function createAuthorSet() {
    if (!booksStore.books.value) await booksStore.getBooksFromApi();
    await booksStore.books.value.forEach((book) => {
      book.authors.forEach((author) => {
        const regularObj = Object.assign({}, author);
        authors.push(regularObj);
      });
    });
  }

  return { authors, createAuthorSet };
});
