import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://127.0.0.1:5173/books");
});

test("'Add book' link works", async ({ page }) => {
  await page.getByRole("link", { name: "Add book" }).click();
  await page.waitForURL("**/add-book");
  expect(page.url()).toContain("/add-book");
});

test("delete book from the list", async ({ page }) => {
  await page
    .getByTestId("book-remove-1")
    .getByRole("button", { name: "Delete ⤫" })
    .click();

  const locator = page.getByTestId("book-list");
  expect(locator).not.toContain(page.getByTestId("book-remove-1"));
});
