import axios from "axios";
import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import { useGeneralStore } from "./general";
import { strToArr } from "@/helpers";

export const useBooksStore = defineStore("books", () => {
  const generalStore = useGeneralStore();

  const books = reactive([]);
  const currentBook = ref({});
  const currentPage = ref(1);
  const baseURL = ref("https://gutendex.com/books/");

  function getNumberOfBooks() {
    return books.length;
  }

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

  function addBook(book, coverUrl, authors) {
    book.id = Math.random();
    book.formats = {
      "image/jpeg": coverUrl.value || "./src/assets/book-cover-placeholder.svg",
    };
    book.authors = [];
    book.authors.push(...authors);
    book.subjects = strToArr(book.subjects);
    book.bookshalves = strToArr(book.bookshalves);
    books.value.push(book);
  }

  function deleteBook(idx) {
    books.value.splice(idx, 1);
  }

  return {
    books,
    currentPage,
    currentBook,
    getNumberOfBooks,
    getBooksFromApi,
    findBook,
    addBook,
    deleteBook,
    prevPage,
    nextPage,
  };
});
