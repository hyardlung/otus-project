import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/books",
      name: "books",
      component: () => import("../views/BooksView.vue"),
    },
    {
      path: "/books/:bookId",
      name: "book",
      component: () => import("../views/BookPage.vue"),
      props: true,
    },
    {
      path: "/add-book",
      name: "add-book",
      component: () => import("../views/AddBook.vue"),
    },
    {
      path: "/authors",
      name: "authors",
      component: () => import("../views/AuthorsView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../views/NotFound.vue"),
    },
  ],
  scrollBehavior() {
    return {
      top: 0,
    };
  },
});

export default router;
