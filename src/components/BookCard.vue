<template>
  <div class="card" @click="$emit('go-to-book', card.id)">
    <img
      :src="generalStore.getImageSrc(card)"
      :alt="card.title"
      class="card__img"
    />
    <div v-if="hasOverlay" class="card__overlay">
      <button class="card__delete" @click="$emit('deleteBook', index)">
        <div>⤫</div>
      </button>
      <h2 class="card__title">{{ card.title }}</h2>
    </div>
  </div>
</template>

<script setup>
import { useGeneralStore } from "@/stores/general";

const generalStore = useGeneralStore();

defineProps({
  card: {
    type: Object,
    required: true,
  },
  hasOverlay: {
    type: Boolean,
    default: true,
  },
});
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
    width: 20px
    height: 20px
    align-self: flex-end
    border: none
    border-radius: 50%
    background-color: tomato
    color: white
    font-size: 12px
    cursor: pointer
    transition: all .2s ease
    &:hover
      filter: brightness(135%)
</style>
