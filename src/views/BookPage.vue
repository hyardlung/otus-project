<template>
  <main>
    <div class="container">
      <div class="controls">
        <RouterLink :to="{ name: 'books' }">← Back</RouterLink>
      </div>
      <div class="book">
        <div class="book__cover">
          <img :src="imageSrc(currentBook)" alt="" class="book__cover-img" />
        </div>
        <div class="book__text">
          <h1 class="book__title">{{ currentBook.title }}</h1>
          <div class="book__authors">
            <span>{{
              currentBook.authors.length > 1 ? "Authors:" : "Author:"
            }}</span>
            <div
              v-for="author in currentBook.authors"
              :key="author"
              class="book__author"
            >
              <span>{{ author.name }} </span>
              <p class="book__author-dates">
                <span>({{ author.birth_year }} - {{ author.death_year }})</span>
              </p>
            </div>
          </div>

          <div v-if="currentBook.bookshelves.length" class="book__bookshelves">
            <span>{{
              currentBook.bookshelves.length > 1
                ? "Bookshelves:"
                : "Bookshelve:"
            }}</span>
            <div
              v-for="bookshelve in currentBook.bookshelves"
              :key="bookshelve"
              class="book__bookshelve"
            >
              <span>{{ bookshelve }}</span>
            </div>
          </div>

          <div class="book__subjects">
            <span>Subjects:</span>
            <div
              v-for="bookshelve in currentBook.bookshelves"
              :key="bookshelve"
              class="book__bookshelve"
            >
              <span>{{ bookshelve }}</span>
            </div>
          </div>

          <span>Download count: {{ currentBook.download_count }}</span>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { ref, onBeforeMount } from "vue";

import { getBooksFromApi } from "../helpers";
import { books } from "../stores/books";
import { imageSrc } from "../helpers";

const props = defineProps(["bookId"]);

const isLoading = ref(false);
const currentBook = ref({});

onBeforeMount(() => {
  getBooks();
  findBook(props.bookId);
  console.log(currentBook.value);
});

async function getBooks() {
  isLoading.value = true;
  await getBooksFromApi(books);
  isLoading.value = false;
}

function findBook(id) {
  currentBook.value = books.value.find((item) => item.id == id);
}
</script>
<style lang="sass" scoped>
.controls
  margin: 20px 0

.book
  display: flex
  gap: 32px

  &__text
    display: flex
    flex-direction: column
    gap: 16px

  &__authors
    display: flex
    flex-direction: column
    gap: 8px

  &__author
    display: flex
    gap: 12px
</style>
