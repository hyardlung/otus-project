<template>
  <main>
    <div class="container">
      <div class="controls">
        <router-link to="/add-book">Add book</router-link>
      </div>
      <div class="books" v-if="!isLoading">
        <BookCard
          v-for="(book, index) in books.value"
          :key="index"
          :card="book"
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

import BookCard from "@/components/BookCard.vue";
import loader from "@/assets/ball-triangle.svg";

import { getBooksFromApi } from "../helpers";
import { books } from "../stores/books";

const isLoading = ref(false);

onBeforeMount(() => {
  getBooks();
});

async function getBooks() {
  isLoading.value = true;
  await getBooksFromApi(books);
  isLoading.value = false;
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
