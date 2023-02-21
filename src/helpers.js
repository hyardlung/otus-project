export function getImageSrc(obj) {
  if (obj && obj.formats["image/jpeg"]) {
    return obj.formats["image/jpeg"];
  } else {
    return "./src/assets/book-cover-placeholder.svg";
  }
}

export function strToArr(str) {
  if (!str) return;
  return str.includes(",") ? str.split(", ") : [str];
}
