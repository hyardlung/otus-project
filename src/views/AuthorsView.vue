<template>
  <main class="container">
    <div class="controls">
      <RouterLink :to="{ name: 'add-author' }">Add author</RouterLink>
    </div>
    <div class="authors" v-if="!isLoading">
      <div
        v-for="author in authorsStore.authors"
        :key="author"
        @click="goToAuthor(author.name)"
        class="author"
      >
        <span class="author__name">{{ author.name }}</span>
        <div class="author__dates">
          <span class="author__dob">{{ author.birth_year }}</span> —
          <span class="author__dod">{{ author.death_year }}</span>
        </div>
      </div>
    </div>
    <div v-else class="loader">
      <img :src="loader" alt="loader" class="loader__img" />
    </div>
  </main>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";

import { storeToRefs } from "pinia";
import { useGeneralStore } from "@/stores/general";
import { useAuthorsStore } from "@/stores/authors";
import { useBooksStore } from "../stores/books";

const router = useRouter();
const generalStore = useGeneralStore();
const authorsStore = useAuthorsStore();
const booksStore = useBooksStore();
const { isLoading, loader } = storeToRefs(generalStore);

onBeforeMount(() => {
  if (!booksStore.books.value) booksStore.getBooksFromApi();
  if (!authorsStore.authors.value) {
    authorsStore.createAuthorsArray();
  }
});

function goToAuthor(name) {
  router.push({
    name: `author`,
    params: { name: name },
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
</style>
