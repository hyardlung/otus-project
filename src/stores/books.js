import axios from "axios";
import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import { useGeneralStore } from "./general";

export const useBooksStore = defineStore("books", () => {
  const generalStore = useGeneralStore();

  const books = reactive([]);
  const currentBook = ref({});
  const currentPage = ref(1);
  const baseURL = ref("https://gutendex.com/books/");

  async function getBooksFromApi() {
    generalStore.isLoading = true;
    const response = await axios.get(baseURL.value);
    books.value = response.data.results;
    generalStore.isLoading = false;
  }

  async function prevPage() {
    generalStore.isLoading = true;
    if (currentPage.value > 1) {
      const response = await axios.get(
        `${baseURL.value}?page=${currentPage.value--}`
      );
      books.value = response.data.results;
    }
    generalStore.isLoading = false;
  }

  async function nextPage() {
    generalStore.isLoading = true;
    const response = await axios.get(
      `${baseURL.value}?page=${currentPage.value++}`
    );
    books.value = response.data.results;
    generalStore.isLoading = false;
  }

  function findBook(id) {
    currentBook.value = books.value.find((item) => item.id == id);
  }

  function deleteBook(idx) {
    books.value.splice(idx, 1);
  }

  return {
    books,
    currentPage,
    currentBook,
    getBooksFromApi,
    findBook,
    deleteBook,
    prevPage,
    nextPage,
  };
});
