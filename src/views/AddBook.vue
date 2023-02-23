<template>
  <main>
    <div class="container">
      <div class="controls">
        <RouterLink :to="{ name: 'books' }">← Back</RouterLink>
      </div>
      <form @submit.prevent="submit(newBook)" class="add-form">
        <h1>Add new book</h1>
        <!-- book title -->
        <label class="add-form__item">
          Title*
          <input
            type="text"
            placeholder="Book title"
            data-test="book-title-input"
            v-model="v$.newBook.title.$model"
            :class="[
              'add-form__input',
              { 'add-form__input_error': v$.newBook.title.$error },
            ]"
          />
          <span
            v-for="(error, index) in v$.newBook.title.$errors"
            :key="index"
            class="add-form__error-msg"
          >
            {{ error.$message }}
          </span>
        </label>

        <!-- book cover -->
        <label class="add-form__item">
          Cover
          <input
            type="text"
            placeholder="Cover URL"
            data-test="book-cover-input"
            v-model="v$.src.$model"
            :class="[
              'add-form__input',
              { 'add-form__input_error': v$.src.$error },
            ]"
          />
          <span
            v-for="(error, index) in v$.src.$errors"
            :key="index"
            class="add-form__error-msg"
          >
            {{ error.$message }}
          </span>
        </label>

        <!-- book author(s) -->
        <fieldset
          :class="[
            'add-form__fieldset',
            {
              'add-form__fieldset_error':
                v$.newAuthor.name.$error ||
                v$.newAuthor.birth_year.$error ||
                v$.newAuthor.death_year.$error,
            },
          ]"
        >
          <legend>Authors</legend>
          <div class="add-form__author">
            <!-- author's name -->
            <label class="add-form__item">
              Author's name*
              <input
                type="text"
                data-test="author-name-input"
                v-model="v$.newAuthor.name.$model"
                :class="[
                  'add-form__input',
                  { 'add-form__input_error': v$.newAuthor.name.$error },
                ]"
              />
              <span
                v-for="(error, index) in v$.newAuthor.name.$errors"
                :key="index"
                class="add-form__error-msg"
              >
                {{ error.$message }}
              </span>
            </label>
            <label class="add-form__item">
              Birth year*
              <input
                type="text"
                data-test="author-birth-input"
                v-model="v$.newAuthor.birth_year.$model"
                :class="[
                  'add-form__input',
                  { 'add-form__input_error': v$.newAuthor.birth_year.$error },
                ]"
              />
              <span
                v-for="(error, index) in v$.newAuthor.birth_year.$errors"
                :key="index"
                class="add-form__error-msg"
              >
                {{ error.$message }}
              </span>
            </label>
            <label class="add-form__item">
              Death year
              <input
                type="text"
                v-model="v$.newAuthor.death_year.$model"
                :class="[
                  'add-form__input',
                  { 'add-form__input_error': v$.newAuthor.death_year.$error },
                ]"
              />
              <span
                v-for="(error, index) in v$.newAuthor.death_year.$errors"
                :key="index"
                class="add-form__error-msg"
              >
                {{ error.$message }}
              </span>
            </label>
          </div>
          <button
            @click.prevent="addAuthor"
            data-test="submit-button"
            :class="[
              'add-form__add-author',
              {
                'is-visible':
                  newAuthor.name &&
                  newAuthor.birth_year &&
                  !v$.newAuthor.name.$error &&
                  !v$.newAuthor.birth_year.$error,
              },
            ]"
          >
            Add another author
          </button>
        </fieldset>

        <!-- book subjects -->
        <label class="add-form__item">
          Subjects
          <input
            type="text"
            placeholder="Subjects, separated by commas"
            data-test="subjects-input"
            v-model="newBook.subjects"
            class="add-form__input"
          />
        </label>

        <label class="add-form__item">
          Bookshalves
          <input
            type="text"
            placeholder="Bookshalves, separated by commas"
            data-test="bookshalves-input"
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
import { ref, reactive, computed, onBeforeMount } from "vue";

import { useBooksStore } from "@/stores/books";
import { useNotification } from "@kyvg/vue3-notification";
import { useVuelidate } from "@vuelidate/core";
import {
  url,
  integer,
  maxValue,
  minLength,
  maxLength,
  required,
} from "@vuelidate/validators";

const { notify } = useNotification();
const booksStore = useBooksStore();
const src = ref("");

const newBook = ref({
  title: "",
});
const newAuthor = ref({});
const newAuthors = reactive([]);

const requiredTitleLength = ref(2);
const requiredNameLength = ref(2);
const datesMaxLength = ref(4);

const rules = computed(() => ({
  src: {
    url,
  },
  newBook: {
    title: {
      required,
      minLength: minLength(requiredTitleLength.value),
    },
  },
  newAuthor: {
    name: {
      required,
      minLength: minLength(requiredNameLength.value),
    },
    birth_year: {
      required,
      integer,
      maxValue: maxValue(new Date().getFullYear()),
      maxLength: maxLength(datesMaxLength.value),
    },
    death_year: {
      integer,
      maxValue: maxValue(new Date().getFullYear()),
      maxLength: maxLength(datesMaxLength.value),
    },
  },
}));

const v$ = useVuelidate(rules, { newBook, newAuthor, src });

onBeforeMount(() => {
  if (!booksStore.books.value) booksStore.getBooksFromApi();
});

function addAuthor() {
  booksStore.addAuthorToNewBook(newAuthor.value, newAuthors);
  newAuthor.value = {};
  v$.value.newAuthor.$reset();
}

function submit(book) {
  v$.value.$validate();
  if (v$.value.$errors.length) {
    notify({
      title: "SOMETHING WENT WRONG😯",
      text: "Make sure the form is filled out correctly",
      type: "error",
    });
    return;
  } else {
    try {
      addAuthor();
      booksStore.addBook(book, src.value, newAuthors);
      v$.value.$reset();
      newBook.value = {};
      newAuthors.length = 0;
      notify({
        title: "SUCCESS 🎉",
        text: "You added a new book to the list",
        type: "success",
      });
    } catch (err) {
      console.log(err);
      notify({
        title: "SOMETHING WRONG",
        type: "error",
      });
    }
  }
}
</script>

<style lang="sass">
.add-form
  padding: 20px 0
  max-width: 320px
  display: flex
  flex-direction: column
  gap: 14px

  &__fieldset
    position: relative
    margin-left: -14px
    display: flex
    flex-direction: column
    gap: 18px
    width: 346px
    border: 1px solid rgba(255, 255, 255, .2)
    border-radius: 6px
    transition: all .3s ease-in-out

    &_error
      border-color: red

  &__item
    display: flex
    flex-direction: column
    gap: 4px

  &__input
    padding: 8px 12px
    max-width: 340px
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

    &_error
      border-color: red
      background: #FF000015
      &:focus, &:active
        outline: 1px solid red

  &__button
    margin-top: 40px
    padding: 14px 20px
    max-width: 180px
    color: #fff
    font-size: 16px
    font-weight: bold
    background: #FFA500
    border-radius: 6px
    border: none
    cursor: pointer
    transition: all .3s ease-in-out
    &:hover
      box-shadow: 0px 8px 14px 4px rgb(89 64 0 / 75%)

  &__error-msg
    color: red
    animation: fade-in 0.3s ease
    @keyframes fade-in
      0%
        opacity: 0
      100%
        opacity: 1
</style>

<style lang="sass" scoped>
.add-form
  &__author
    padding-bottom: 12px
    border-bottom: 1px solid rgba(255, 255, 255, .2)
    &:last-of-type
      border-bottom: none

  &__add-author
    position: absolute
    right: 0px
    top: 35px
    padding: 10px
    width: max-content
    color: #FFA500
    background: none
    border: 1px solid #FFA500
    border-radius: 4px
    cursor: pointer
    opacity: 0
    visibility: hidden
    transition: all .3s ease-in-out
    &:hover
      background: #FFA50020

    &.is-visible
      right: -150px
      opacity: 1
      visibility: visible
</style>
