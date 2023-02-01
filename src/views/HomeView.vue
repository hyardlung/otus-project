<template>
  <div class="container">
    <RouterLink to="/books" class="books-wrap books-wrap_books">
      <div class="books-wrap__overlay">Books</div>
    </RouterLink>
    <div></div>
    <div class="divider"></div>
    <RouterLink to="/authors" class="books-wrap books-wrap_authors">
      <div class="books-wrap__overlay">Authors</div>
    </RouterLink>
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
  grid-template-areas: "books divider authors"
  gap: 20px

.books-wrap
  position: relative
  font-size: 40px
  font-weight: 700
  color: white
  background-position: top
  background-size: 100%
  transition: all .3s ease
  &:hover
    font-size: 60px
    background-size: 120%
  &:hover &__overlay
    padding: 60px

  &__overlay
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    padding: 30px
    background-color: rgba(0, 0, 0, .5)
    transition: all .3s ease
    pointer-events: none

  &_books
    grid-area: books
    background-image: url("@/assets/books.png")

  &_authors
    grid-area: authors
    background-image: url("@/assets/authors.png")

.divider
  grid-area: divider
  width: 2px
  background-color: #c1c1c1
  border-radius: 100%
</style>
