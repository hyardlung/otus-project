import { ref } from "vue";
import { defineStore } from "pinia";

export const useGeneralStore = defineStore("general", () => {
  const loader = ref("src/assets/ball-triangle.svg");
  const isLoading = ref(false);

  return { loader, isLoading };
});
