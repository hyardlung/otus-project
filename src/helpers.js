import axios from "axios";

export async function getBooksFromApi(books) {
  const resp = await axios.get("https://gutendex.com/books/");
  books.value = resp.data.results;
}

export function imageSrc(val) {
  const formats = Object.values(val.formats);
  const src = formats.find((str) => str.includes(".cover."));
  if (src) return src;
  if (!src) return "";
}
