<template>
  <div class="container">
    <RouterLink to="/books" class="books-wrap">
      <div class="books-wrap__overlay">Books</div>
    </RouterLink>
    <div></div>
    <div class="divider"></div>
    <div class="authors"></div>
  </div>
</template>
<script setup></script>
<style lang="sass" scoped>
.container
  padding-bottom: 46px
  width: 100%
  height: 100%
  display: grid
  grid-template: 1fr / 1fr auto 1fr
  gap: 20px

.books-wrap
  position: relative
  font-size: 40px
  font-weight: 700
  color: white
  background-image: url("@/assets/books.png")
  background-position: top
  background-size: 100%
  transition: all .3s ease
  &:hover
    background-size: 120%

  &__overlay
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    padding: 30px
    background-color: rgba(0, 0, 0, .5)
    pointer-events: none

.divider
  width: 2px
  background-color: #c1c1c1
  border-radius: 100%
</style>
