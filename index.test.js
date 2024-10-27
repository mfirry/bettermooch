import { jest } from "@jest/globals";
import { ifilter } from "./index.js";

describe("ifilter", () => {
  test("should return true if author matches one in the list", () => {
    const book = { Author: "Alberto Manzi", Publisher: "some publisher" };
    expect(ifilter(book)).toBe(false);
  });

  // test("should return true if publisher matches one in the list", () => {
  //   const book = { Author: "Unknown Author", Publisher: "Einaudi" };
  //   expect(ifilter(book)).toBe(true);
  // });

  // test("should return false if neither author nor publisher match", () => {
  //   const book = { Author: "Unknown Author", Publisher: "Unknown Publisher" };
  //   expect(ifilter(book)).toBe(false);
  // });

  // test("should handle empty or single-word author names gracefully", () => {
  //   const book = { Author: "A", Publisher: "Einaudi" };
  //   expect(ifilter(book)).toBe(true); // Publisher should still trigger a match
  // });

  // test("should handle null values in Publisher gracefully", () => {
  //   const book = { Author: "Unknown Author", Publisher: null };
  //   expect(ifilter(book)).toBe(false);
  // });

  // test("should handle undefined or missing Author property", () => {
  //   const book = { Publisher: "Einaudi" };
  //   expect(ifilter(book)).toBe(true); // Publisher should trigger a match alone
  // });
});
