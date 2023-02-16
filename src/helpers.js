export function getImageSrc(obj) {
  const src = obj.formats["image/jpeg"];
  return src ? src : "";
}

export function strToArr(str) {
  return str.includes(",") ? str.split(", ") : [str];
}
