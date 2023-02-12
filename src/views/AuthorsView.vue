<template>
  <main>
    <div class="authors" v-if="!generalStore.isLoading">
      <div class="author" v-for="author in authorsStore.authors" :key="author">
        <span class="author__name">{{ author.name }}</span>
        <div class="author__dates">
          <span class="author__dob">{{ author.birth_year }}</span> —
          <span class="author__dod">{{ author.death_year }}</span>
        </div>
      </div>
    </div>
    <div v-else class="loader">
      <img :src="generalStore.loader" alt="" class="loader__img" />
    </div>
  </main>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useGeneralStore } from "@/stores/general";
import { useAuthorsStore } from "@/stores/authors";

onBeforeMount(() => {
  if (!authorsStore.authors.value) authorsStore.createAuthorSet();
});

const generalStore = useGeneralStore();
const authorsStore = useAuthorsStore();
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
