<template>
  <main>
    <div class="authors" v-if="!isLoading">
      <div class="author" v-for="author in authorSet" :key="author">
        <span class="author__name">{{ author.name }}</span>
        <div class="author__dates">
          <span class="author__dob">{{ author.birth_year }}</span> —
          <span class="author__dod">{{ author.death_year }}</span>
        </div>
      </div>
    </div>
    <div v-else class="loader">
      <img :src="loader" alt="" class="loader__img" />
    </div>
  </main>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";

import { getBooksFromApi } from "../helpers";
import { books } from "../stores/books";
import loader from "@/assets/ball-triangle.svg";

onBeforeMount(() => {
  getBooks();
  createAuthorSet(books.value);
});

const isLoading = ref(false);
const authorSet = new Set();

async function getBooks() {
  isLoading.value = true;
  await getBooksFromApi(books);
  isLoading.value = false;
}

async function createAuthorSet(array) {
  await array.forEach((obj) => {
    obj.authors.forEach((author) => {
      authorSet.add(author);
    });
  });
}
</script>

<style lang="sass" scoped>
.authors
  display: flex
  flex-direction: column
  gap: 40px

.author
  display: flex
  flex-direction: column
  gap: 6px
  &__name
    font-size: 28px
    line-height: 28px

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
