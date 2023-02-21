import { describe, expect, it, vi, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";
import { useBooksStore } from "@/stores/books";

describe("BooksStore", () => {
  let booksStore = null;
  const coverUrl = "http://example.com/image.jpg";
  const book = {
    title: "My Book",
    subjects: ["subject 1", "subject 2", "subject 3"],
    bookshalves: ["bookshalve 1", "bookshalve 2", "bookshalve 3"],
  };

  beforeEach(() => {
    setActivePinia(createPinia());
    booksStore = useBooksStore();
  });

  it("initializes with zero books", () => {
    expect(booksStore.getNumberOfBooks()).toEqual(0);
  });

  it("should get books from API", async () => {
    // // mock axios and useGeneralStore
    // const mockAxios = {
    //   get: vi.fn().mockResolvedValue({ data: { results: [{ id: 1 }] } }),
    // };
    // console.log(mockAxios);
    // const mockGeneralStore = {
    //   isLoading: false,
    // };
    // booksStore.$with(mockAxios, { useGeneralStore: () => mockGeneralStore });
    // // call getBooksFromApi method
    // await booksStore.getBooksFromApi();
    // // assert expected values
    // expect(mockAxios.get).toHaveBeenCalledWith("https://gutendex.com/books/");
    // expect(booksStore.books).toEqual([{ id: 1 }]);
    // expect(mockGeneralStore.isLoading).toBe(false);
  });

  // it("should go to previous page", async () => {
  //   // mock axios and useGeneralStore
  //   const mockAxios = {
  //     get: vi.fn().mockResolvedValue({ data: { results: [{ id: 1 }] } }),
  //   };
  //   const mockGeneralStore = {
  //     isLoading: false,
  //   };
  //   booksStore.$with(mockAxios, { useGeneralStore: () => mockGeneralStore });
  //   booksStore.currentPage.value = 2;

  //   // call prevPage method
  //   await booksStore.prevPage();

  //   // assert expected values
  //   expect(mockAxios.get).toHaveBeenCalledWith(
  //     "https://gutendex.com/books/?page=1"
  //   );
  //   expect(booksStore.books).toEqual([{ id: 1 }]);
  //   expect(mockGeneralStore.isLoading).toBe(false);
  // });

  // it("should go to next page", async () => {
  //   // mock axios and useGeneralStore
  //   const mockAxios = {
  //     get: vi.fn().mockResolvedValue({ data: { results: [{ id: 2 }] } }),
  //   };
  //   const mockGeneralStore = {
  //     isLoading: false,
  //   };
  //   booksStore.$with(mockAxios, { useGeneralStore: () => mockGeneralStore });

  //   // call nextPage method
  //   await booksStore.nextPage();

  //   // assert expected values
  //   expect(mockAxios.get).toHaveBeenCalledWith(
  //     "https://gutendex.com/books/?page=2"
  //   );
  //   expect(booksStore.books).toEqual([{ id: 2 }]);
  //   expect(mockGeneralStore.isLoading).toBe(false);
  // });

  // it("should delete a book", () => {
  //   // set up initial books
  //   booksStore.books = [{ id: 1 }, { id: 2 }, { id: 3 }];

  //   // call deleteBook method
  //   booksStore.deleteBook(1);

  //   // assert expected values
  //   expect(booksStore.books).toEqual([{ id: 1 }, { id: 3 }]);
  // });
});
