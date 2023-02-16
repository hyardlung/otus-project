<template>
  <main class="container">
    <div class="controls">
      <button @click="router.go(-1)" class="green controls__green">Back</button>
    </div>
    <div class="author">
      <h1 class="author_name">{{ currentAuthor.name }}</h1>
      <p class="authors__dates">
        {{ currentAuthor.birth_year }} -
        {{ currentAuthor.death_year }}
      </p>
      <div class="books">
        <BookCard
          v-for="(book, index) in currentAuthorBooks"
          :key="book.id"
          :card="book"
          :isDeletable="false"
          @go-to-book="goToBook(book.id)"
          @deleteBook="booksStore.deleteBook(index)"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { useAuthorsStore } from "@/stores/authors";
import { useBooksStore } from "@/stores/books";
import { useRouter } from "vue-router";

import BookCard from "@/components/BookCard.vue";

const router = useRouter();
const authorsStore = useAuthorsStore();
const booksStore = useBooksStore();
const { currentAuthor } = storeToRefs(authorsStore);
const currentAuthorBooks = ref([]);

const props = defineProps(["name"]);

onBeforeMount(() => {
  booksStore.getBooksFromApi();
  authorsStore.createAuthorsArray();
  authorsStore.findAuthor(props.name);
  getAuthorBooks();
});

function getAuthorBooks() {
  booksStore.books.value.forEach((book) => {
    book.authors.forEach((author) => {
      if (author.name === currentAuthor.value.name) {
        currentAuthorBooks.value.push(book);
      }
    });
  });
}

function goToBook(id) {
  router.push({
    name: `book`,
    params: { bookId: id },
  });
}
</script>

<style lang="sass">
.controls__green
  position: relative
  padding: 10px
  display: flex
  align-items: center
  gap: 4px
  background: none
  border: none
  cursor: pointer
  transition: all .3s ease-in-out
  &::before
    content: "← "
    position: absolute
    left: -10px
    bottom: 10px
    transition: all .3s ease-in-out
  &:hover
    &::before
      left: -16px

.books
  margin-top: 60px
  width: 100%
  display: flex
  flex-wrap: wrap
  gap: 20px
</style>
