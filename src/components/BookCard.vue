<template>
  <div class="card" @click="onBookClick(card.id)">
    <img :src="getImageSrc(card)" :alt="card.title" class="card__img" />
    <div v-if="hasOverlay" class="card__overlay">
      <button v-if="isDeletable" class="card__delete" @click="onBookDelete">
        <div class="card__delete-cross">⤫</div>
      </button>
      <h2 class="card__title">{{ card.title }}</h2>
    </div>
  </div>
</template>

<script setup>
import { getImageSrc } from "@/helpers";

defineProps({
  card: {
    type: Object,
    required: true,
  },
  hasOverlay: {
    type: Boolean,
    default: true,
  },
  isDeletable: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["goToBookPage", "deleteBook"]);

function onBookClick(id) {
  emit("goToBookPage", id);
}

function onBookDelete(index) {
  emit("deleteBook", index);
}
</script>

<style lang="sass">
.card
  position: relative
  min-width: 160px
  max-width: 186px
  width: 100%
  height: 250px
  overflow: hidden
  cursor: pointer
  &:hover &__overlay
    opacity: 1

  &__overlay
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    padding: 14px
    display: flex
    flex-direction: column
    justify-content: space-between
    font-size: 14px
    line-height: 22px
    color: var(--vt-c-text-dark-1)
    background-color: rgba(0, 0, 0, .5)
    transition: all .3s ease
    opacity: 0

  &__img
    width: 100%
    height: 100%
    object-fit: cover

  &__delete
    position: relative
    padding: 0
    width: 20px
    height: 20px
    display: flex
    align-self: flex-end
    align-items: center
    justify-content: center
    border: none
    border-radius: 50%
    background-color: tomato
    color: white
    font-size: 18px
    font-weight: 900
    cursor: pointer
    transition: all .2s ease
    &__delete-cross
      height: 18px
    &::before
      width: 0
      content: 'Delete'
      position: absolute
      right: 10px
      padding: 0 12px 0 5px
      height: 20px
      display: flex
      align-items: center
      font-size: 12px
      // background: cyan
      border-top-left-radius: 10px
      border-bottom-left-radius: 10px
      opacity: 0
      transition: all .2s ease
      background: #FF6347

    &:hover
      filter: brightness(135%)
      &::before
        width: 52px
        opacity: 1
</style>
