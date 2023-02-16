<template>
  <div class="container">
    <div class="controls">
      <RouterLink :to="{ name: 'authors' }">← Back</RouterLink>
    </div>
    <form
      @submit.prevent="authorsStore.AddAuthor(authorsStore.newAuthor)"
      class="add-form"
    >
      <h1>Add new author</h1>
      <label class="add-form__item">
        Author's name
        <input
          type="text"
          v-model="authorsStore.newAuthor.name"
          class="add-form__input"
          required
        />
      </label>
      <label class="add-form__item">
        Date of birth
        <input
          type="text"
          v-model.number="authorsStore.newAuthor.birth_year"
          maxlength="4"
          class="add-form__input"
        />
      </label>
      <label class="add-form__item">
        Date of death
        <input
          type="text"
          v-model.number="authorsStore.newAuthor.death_year"
          maxlength="4"
          class="add-form__input"
        />
      </label>
      <button class="add-form__button">Add</button>
    </form>
  </div>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useAuthorsStore } from "@/stores/authors";

onBeforeMount(() => {
  if (!authorsStore.authors.value) authorsStore.createAuthorsArray();
});

const authorsStore = useAuthorsStore();
</script>

<style lang="sass">
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
