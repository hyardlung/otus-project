<template>
  <main>
    <div class="container">
      <div class="controls">
        <RouterLink :to="{ name: 'books' }">← Back</RouterLink>
      </div>
      <form
        @submit.prevent="booksStore.addBook(booksStore.newBook)"
        class="add-form"
      >
        <h1>Add new book</h1>
        <label class="add-form__item">
          Title
          <input
            type="text"
            v-model="booksStore.newBook.title"
            class="add-form__input"
            required
          />
        </label>
        <label class="add-form__item">
          Cover
          <input type="text" v-model="booksStore.src" class="add-form__input" />
        </label>
        <label class="add-form__item">
          Subjects
          <input
            type="text"
            v-model="booksStore.newBook.subjects"
            class="add-form__input"
          />
        </label>
        <label class="add-form__item">
          Authors
          <input
            type="text"
            v-model="booksStore.newBook.authors"
            class="add-form__input"
          />
        </label>
        <label class="add-form__item">
          Bookshalves
          <input
            type="text"
            v-model="booksStore.newBook.bookshalves"
            class="add-form__input"
          />
        </label>
        <button class="add-form__button">Add</button>
      </form>
    </div>
  </main>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useBooksStore } from "@/stores/books";

const booksStore = useBooksStore();

onBeforeMount(() => {
  if (!booksStore.books.value) booksStore.getBooksFromApi();
});
</script>

<style lang="sass">
.controls
  margin: 20px 0

.add-form
  padding: 20px 0
  max-width: 320px
  display: flex
  flex-direction: column
  gap: 14px

  &__item
    display: flex
    flex-direction: column
    gap: 4px

  &__input
    padding: 8px 12px
    max-width: 300px
    width: 100%
    height: 40px
    font-size: 16px
    color: #fff
    background: rgba(255, 255, 255, .09)
    border-radius: 8px
    border: 1px solid rgba(255, 255, 255, .2)
    transition: all .3s ease-in-out
    &:focus
      background: rgba(255, 255, 255, .2)

  &__button
    margin-top: 40px
    padding: 14px 20px
    max-width: 180px
    font-size: 16px
    font-weight: bold
    cursor: pointer
</style>
