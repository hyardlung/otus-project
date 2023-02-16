import { ref } from "vue";
import { defineStore } from "pinia";

export const useGeneralStore = defineStore("general", () => {
  const loader = ref("src/assets/ball-triangle.svg");
  const isLoading = ref(false);

  function getImageSrc(obj) {
    const src = obj.formats["image/jpeg"];
    return src ? src : "";
  }

  function strToArr(str) {
    return str.includes(",") ? str.split(", ") : [str];
  }

  return { loader, isLoading, getImageSrc, strToArr };
});
