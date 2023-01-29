<template>
  <main>
    <div class="container">
      <div class="controls">
        <router-link to="/books">Back</router-link>
      </div>
      <form @submit.prevent="addBook(newBook)" class="add-form">
        <h1>Add new book</h1>
        <label class="add-form__item">
          Title
          <input type="text" v-model="newBook.title" class="add-form__input" />
        </label>
        <label class="add-form__item">
          Subjects
          <input
            type="text"
            v-model="newBook.subjects"
            class="add-form__input"
          />
        </label>
        <label class="add-form__item">
          Authors
          <input
            type="text"
            v-model="newBook.authors"
            class="add-form__input"
          />
        </label>
        <label class="add-form__item">
          Bookshalves
          <input
            type="text"
            v-model="newBook.bookshalves"
            class="add-form__input"
          />
        </label>
        <button class="add-form__button">Add</button>
      </form>
    </div>
  </main>
</template>

<script setup>
import { reactive, onBeforeMount } from "vue";

import { getBooksFromApi } from "../helpers";
import { books } from "../stores/books";

const newBook = reactive({});

onBeforeMount(() => {
  getBooks();
});

async function getBooks() {
  await getBooksFromApi(books);
}

function strToArr(str) {
  return str.includes(",") ? str.split(", ") : [str];
}

function addBook(book) {
  book.subjects = strToArr(book.subjects);
  book.bookshalves = strToArr(book.bookshalves);
  books.value.push(book);
}
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
    border-radius: 8px

  &__button
    margin-top: 40px
    padding: 14px 20px
    max-width: 180px
    font-size: 16px
    font-weight: bold
    cursor: pointer
</style>
