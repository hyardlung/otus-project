<template>
  <main>
    <div class="container">
      <div class="controls">
        <RouterLink :to="{ name: 'books' }">← Back</RouterLink>
      </div>
      <div class="book">
        <div class="book__cover">
          <img
            :src="generalStore.getImageSrc(booksStore.currentBook)"
            alt=""
            class="book__cover-img"
          />
        </div>
        <div class="book__text">
          <h1 class="book__title">{{ booksStore.currentBook.title }}</h1>
          <div class="book__item book__authors">
            <span class="book__item-title">
              {{
                booksStore.currentBook.authors.length > 1
                  ? "Authors:"
                  : "Author:"
              }}
            </span>
            <div
              v-for="author in booksStore.currentBook.authors"
              :key="author"
              class="book__author"
            >
              <span>{{ author.name }} </span>
              <p class="book__author-dates">
                <span>({{ author.birth_year }} - {{ author.death_year }})</span>
              </p>
            </div>
          </div>

          <div
            v-if="booksStore.currentBook.bookshelves.length"
            class="book__item book__bookshelves"
          >
            <span class="book__item-title">
              {{
                booksStore.currentBook.bookshelves.length > 1
                  ? "Bookshelves:"
                  : "Bookshelve:"
              }}
            </span>
            <div
              v-for="bookshelve in booksStore.currentBook.bookshelves"
              :key="bookshelve"
              class="book__bookshelve"
            >
              <span>{{ bookshelve }}</span>
            </div>
          </div>

          <div class="book__item book__subjects">
            <span class="book__item-title">Subjects:</span>
            <div
              v-for="subject in booksStore.currentBook.subjects"
              :key="subject"
              class="book__subject"
            >
              <span>{{ subject }}</span>
            </div>
          </div>

          <span class="book__item">
            <span class="book__item-title">Download count:</span>
            {{ booksStore.currentBook.download_count }}
          </span>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { onBeforeMount } from "vue";
import { useGeneralStore } from "@/stores/general";
import { useBooksStore } from "@/stores/books";

const generalStore = useGeneralStore();
const booksStore = useBooksStore();
const props = defineProps(["bookId"]);

onBeforeMount(() => {
  if (!booksStore.books.value) booksStore.getBooksFromApi();
  booksStore.findBook(props.bookId);
});
</script>

<style lang="sass" scoped>
.book
  display: flex
  gap: 32px

  &__text
    display: flex
    flex-direction: column
    gap: 16px

  &__item-title
    font-weight: 700

  &__author
    display: flex
    gap: 8px
</style>
