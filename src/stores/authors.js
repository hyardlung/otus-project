import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import { useBooksStore } from "./books";

export const useAuthorsStore = defineStore("authors", () => {
  const booksStore = useBooksStore();

  const authors = reactive([]);
  const newAuthor = ref({});
  const currentAuthor = ref({});

  async function createAuthorsArray() {
    if (!booksStore.books.value) await booksStore.getBooksFromApi();
    await booksStore.books.value.forEach((book) => {
      book.authors.forEach((author) => {
        authors.push(author);
      });
    });
  }

  function findAuthor(name) {
    currentAuthor.value = authors.find((author) => author.name === name);
  }

  function AddAuthor(author) {
    authors.push(author);
    newAuthor.value = {};
  }

  return {
    authors,
    newAuthor,
    currentAuthor,
    createAuthorsArray,
    findAuthor,
    AddAuthor,
  };
});
