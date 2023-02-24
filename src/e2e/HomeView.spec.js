import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://127.0.0.1:5173");
});

test("'Books' link works", async ({ page }) => {
  await page.getByRole("link", { name: "Books" }).click();
  await page.waitForURL("**/books");
  expect(page.url()).toContain("/books");
});

test("'Authors' link works", async ({ page }) => {
  await page.getByRole("link", { name: "Authors" }).click();
  await page.waitForURL("**/authors");
  expect(page.url()).toContain("/authors");
});
