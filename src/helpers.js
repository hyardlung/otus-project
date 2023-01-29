import axios from "axios";

export async function getBooksFromApi(books) {
  const resp = await axios.get("https://gutendex.com/books/");
  books.value = resp.data.results;
}
