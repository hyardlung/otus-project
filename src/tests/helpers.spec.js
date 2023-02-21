import { describe, expect, it } from "vitest";
import { getImageSrc, strToArr } from "../helpers";

describe("getImageSrc", () => {
  it("returns placeholder image src if obj is null or undefined", () => {
    expect(getImageSrc(null || undefined)).toEqual(
      "./src/assets/book-cover-placeholder.svg"
    );
  });

  it('returns image src if obj has "image/jpeg" format', () => {
    const obj = {
      formats: {
        "image/jpeg": "http://example.com/image.jpg",
      },
    };

    expect(getImageSrc(obj)).toEqual("http://example.com/image.jpg");
  });
});

describe("strToArr", () => {
  it("returns undefined if str is null or undefined", () => {
    expect(strToArr(null || undefined)).toBeUndefined();
  });

  it("returns array with one element if str has no comma", () => {
    expect(strToArr("hello")).toEqual(["hello"]);
  });

  it("returns array of elements split by comma and space", () => {
    expect(strToArr("hello, world")).toEqual(["hello", "world"]);
  });
});
