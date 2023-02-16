import axios from "axios";
import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import { useGeneralStore } from "./general";
import { strToArr } from "@/helpers";

export const useBooksStore = defineStore("books", () => {
  const generalStore = useGeneralStore();

  const books = reactive([]);
  const newBook = ref({});
  const currentBook = ref({});
  const currentPage = ref(1);
  const src = ref("");

  async function getBooksFromApi() {
    generalStore.isLoading = true;
    const response = await axios.get("https://gutendex.com/books/");
    books.value = response.data.results;
    generalStore.isLoading = false;
  }

  async function prevPage() {
    generalStore.isLoading = true;
    if (currentPage.value > 1) {
      const response = await axios.get(
        `https://gutendex.com/books/?page=${currentPage.value--}`
      );
      books.value = response.data.results;
    }
    generalStore.isLoading = false;
  }

  async function nextPage() {
    generalStore.isLoading = true;
    const response = await axios.get(
      `https://gutendex.com/books/?page=${currentPage.value++}`
    );
    books.value = response.data.results;
    generalStore.isLoading = false;
  }

  function findBook(id) {
    currentBook.value = books.value.find((item) => item.id == id);
  }

  function addBook(book) {
    book.id = Math.random();
    book.formats = { "image/jpeg": src.value };
    book.authors = strToArr(book.authors);
    book.subjects = strToArr(book.subjects);
    book.bookshalves = strToArr(book.bookshalves);
    books.value.push(book);
    newBook.value = {};
  }

  function deleteBook(idx) {
    books.value.splice(idx, 1);
  }

  return {
    books,
    currentPage,
    currentBook,
    newBook,
    src,
    getBooksFromApi,
    findBook,
    addBook,
    deleteBook,
    prevPage,
    nextPage,
  };
});
