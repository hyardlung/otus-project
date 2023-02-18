<template>
  <div class="container">
    <div class="controls">
      <RouterLink :to="{ name: 'authors' }">← Back</RouterLink>
    </div>
    <form @submit.prevent="AddAuthor(newAuthor)" class="add-form">
      <h1>Add new author</h1>
      <label class="add-form__item">
        Author's name*
        <input
          type="text"
          v-model="v$.name.$model"
          :class="[
            'add-form__input',
            { 'add-form__input_error': v$.name.$error },
          ]"
        />
        <span
          v-for="(error, index) in v$.name.$errors"
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
          v-model="v$.birth_year.$model"
          :class="[
            'add-form__input',
            { 'add-form__input_error': v$.birth_year.$error },
          ]"
        />
        <span
          v-for="(error, index) in v$.birth_year.$errors"
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
          v-model="v$.death_year.$model"
          :class="[
            'add-form__input',
            { 'add-form__input_error': v$.death_year.$error },
          ]"
        />
        <span
          v-for="(error, index) in v$.death_year.$errors"
          :key="index"
          class="add-form__error-msg"
        >
          {{ error.$message }}
        </span>
      </label>
      <button class="add-form__button">Add</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from "vue";
import { useAuthorsStore } from "@/stores/authors";
import { useNotification } from "@kyvg/vue3-notification";

import { useVuelidate } from "@vuelidate/core";
import {
  integer,
  maxValue,
  minLength,
  maxLength,
  required,
} from "@vuelidate/validators";

const authorsStore = useAuthorsStore();
const newAuthor = ref({});
const { notify } = useNotification();

const requiredNameLength = ref(2);
const datesMaxLength = ref(4);

onBeforeMount(() => {
  if (!authorsStore.authors.value) authorsStore.createAuthorsArray();
});

const rules = computed(() => ({
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
}));

const v$ = useVuelidate(rules, newAuthor);

function AddAuthor(author) {
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
      authorsStore.authors.push(author);
      newAuthor.value = {};
      v$.value.$reset();
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
