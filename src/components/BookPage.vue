<template>
  <div class="book">
    <img
      :src="imageSrc(props.book.value)"
      :alt="props.book.value.title"
      class="book__img"
    />
    <div class="book__info">
      <h2 class="book__title">{{ props.book.value.title }}</h2>
      <div
        v-for="(author, idx) in props.book.value.authors"
        :key="idx"
        class="book__author"
      >
        <p class="author__name">{{ author.name }}</p>
        <p class="book__author-dates">
          {{ author.birth_year }}
          <template v-if="author.death_year">
            - {{ author.death_year }}
          </template>
        </p>
      </div>
      <p class="book__description"></p>
    </div>
  </div>
</template>
<script setup>
const props = defineProps(["book"]);

function imageSrc(val) {
  const formats = Object.values(val.formats);
  const src = formats.find((str) => str.includes(".cover."));
  if (src) return src;
  if (!src) return "";
}
</script>
<style lang="sass">
.book
  &__author
    display: flex
    gap: 10px
    font-style: italic
</style>
