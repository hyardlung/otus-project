<template>
  <main class="container">
    <div class="controls">
      <RouterLink :to="{ name: 'add-book' }">Add book</RouterLink>
      <div class="pagination">
        <button class="pagination__btn" @click="booksStore.prevPage">
          prev
        </button>
        <button class="pagination__btn" @click="booksStore.nextPage">
          next
        </button>
      </div>
    </div>
    <template v-if="!generalStore.isLoading">
      <div class="books">
        <BookCard
          v-for="(book, index) in booksStore.books.value"
          :key="book.id"
          :card="book"
          @go-to-book="goToBook(book.id)"
          @deleteBook="booksStore.deleteBook(index)"
        />
      </div>
    </template>
    <div v-else class="loader">
      <img :src="generalStore.loader" alt="" class="loader__img" />
    </div>
  </main>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";

import { useGeneralStore } from "@/stores/general";
import { useBooksStore } from "@/stores/books";

import BookCard from "@/components/BookCard.vue";

const generalStore = useGeneralStore();
const booksStore = useBooksStore();
const router = useRouter();

onBeforeMount(() => {
  if (!booksStore.books.value) booksStore.getBooksFromApi();
});

function goToBook(id) {
  router.push({
    name: `book`,
    params: { bookId: id },
  });
}
</script>

<style lang="sass" scoped>
.books
  width: 100%
  display: flex
  flex-wrap: wrap
  gap: 20px

.pagination
  display: flex
  gap: 16px
  &__btn
    width: 80px
    height: 36px
    color: #FFA500
    background: none
    border: 1px solid #FFA500
    border-radius: 6px
    transition: all .3s ease-in-out
    cursor: pointer
    &:hover
      background: #FFA50020
</style>
