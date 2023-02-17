<template>
  <main>
    <div class="container">
      <div class="controls">
        <RouterLink :to="{ name: 'books' }">← Back</RouterLink>
      </div>
      <form @submit.prevent="addBook(newBook)" class="add-form">
        <h1>Add new book</h1>
        <label class="add-form__item">
          Title
          <input
            type="text"
            v-model="newBook.title"
            class="add-form__input"
            required
          />
        </label>
        <label class="add-form__item">
          Cover
          <input type="text" v-model="src.value" class="add-form__input" />
        </label>
        <label class="add-form__item">
          Subjects
          <input
            type="text"
            v-model="newBook.subjects"
            class="add-form__input"
          />
        </label>
        <fieldset>
          <legend>Authors</legend>
          <div class="add-form__author">
            <label class="add-form__item">
              Author's name
              <input
                type="text"
                v-model="newAuthor.name"
                class="add-form__input"
              />
            </label>
            <label class="add-form__item">
              Birth year
              <input
                type="number"
                max="9999"
                v-model="newAuthor.birth_year"
                class="add-form__input"
              />
            </label>
            <label class="add-form__item">
              Death year
              <input
                type="number"
                max="9999"
                v-model="newAuthor.death_year"
                class="add-form__input"
              />
            </label>
          </div>
          <button
            @click.prevent="addAnotherAuthor"
            :class="[
              'add-form__add-author',
              {
                'is-visible':
                  newAuthor.name &&
                  newAuthor.birth_year &&
                  newAuthor.death_year,
              },
            ]"
          >
            Add another author
          </button>
        </fieldset>
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
import { ref, reactive, onBeforeMount } from "vue";
import { useBooksStore } from "@/stores/books";
import { strToArr } from "../helpers";
import { useNotification } from "@kyvg/vue3-notification";

const { notify } = useNotification();
const booksStore = useBooksStore();
const src = ref("");
const newBook = ref({});
const newAuthors = reactive([]);
const newAuthor = ref({
  name: "",
  birth_year: null,
  death_year: null,
});

onBeforeMount(() => {
  if (!booksStore.books.value) booksStore.getBooksFromApi();
});

function addAnotherAuthor() {
  newAuthors.push(newAuthor.value);
  newAuthor.value = {};
}

function addBook(book) {
  book.id = Math.random();
  book.formats = {
    "image/jpeg": src.value || "./src/assets/book-cover-placeholder.svg",
  };
  book.authors = newAuthors;
  book.subjects = strToArr(book.subjects);
  book.bookshalves = strToArr(book.bookshalves);
  booksStore.books.value.push(book);
  newBook.value = {};
  notify({
    title: "SUCCESS 🎉",
    text: "You added a new book to the list",
    type: "success",
  });
}
</script>

<style lang="sass">
.add-form
  padding: 20px 0
  max-width: 320px
  display: flex
  flex-direction: column
  gap: 14px

  fieldset
    position: relative
    margin-left: -14px
    display: flex
    flex-direction: column
    gap: 18px
    width: 326px
    // width: 100%
    border: 1px solid rgba(255, 255, 255, .2)
    border-radius: 6px

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

<style lang="sass">
.add-form
  &__author
    padding-bottom: 12px
    border-bottom: 1px solid rgba(255, 255, 255, .2)
    &:last-of-type
      border-bottom: none
  &__add-author
    position: absolute
    right: 0px
    bottom: 22px
    padding: 10px
    width: max-content
    color: #00bd7e
    background: none
    border: 1px solid #00bd7e
    border-radius: 4px
    cursor: pointer
    opacity: 0
    visibility: hidden
    transition: all .3s ease-in-out
    &:hover
      background: #00bd7e20

    &.is-visible
      right: -150px
      opacity: 1
      visibility: visible
</style>
