export function getImageSrc(obj) {
  const src = obj.formats["image/jpeg"];
  return src ? src : "./src/assets/book-cover-placeholder.svg";
}

export function strToArr(str) {
  if (!str) return;
  return str.includes(",") ? str.split(", ") : [str];
}
