<template>
  <main>
    <div class="container">
      <div class="controls">
        <RouterLink :to="{ name: 'add-book' }">Add book</RouterLink>
      </div>
      <div class="books" v-if="!isLoading">
        <BookCard
          v-for="(book, index) in books.value"
          :key="book.id"
          :card="book"
          @go-to-book="goToBook(book.id)"
          @deleteBook="deleteBook(index)"
        />
      </div>
      <div v-else class="loader">
        <img :src="loader" alt="" class="loader__img" />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";

import BookCard from "@/components/BookCard.vue";
import loader from "@/assets/ball-triangle.svg";

import { getBooksFromApi } from "../helpers";
import { books } from "../stores/books";

const router = useRouter();

const isLoading = ref(false);

onBeforeMount(() => {
  getBooks();
});

async function getBooks() {
  isLoading.value = true;
  await getBooksFromApi(books);
  isLoading.value = false;
}

function goToBook(id) {
  router.push({
    name: `book`,
    params: { bookId: id },
  });
}

function deleteBook(index) {
  books.value.splice(index, 1);
}
</script>

<style lang="sass" scoped>
.books
  width: 100%
  display: flex
  flex-wrap: wrap
  gap: 20px

.controls
  margin: 20px 0

.loader
  position: relative
  height: 75vh
  &__img
    position: absolute
    top: 50%
    right: 50%
    transform: translate(50%, -50%)
    display: block
</style>
