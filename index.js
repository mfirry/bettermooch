import axios from "axios";

import send from "./mailer.js";
import { authors, publishers } from "./config.js";

export const ifilter = (book) => {
  const a = book.Author.split(" ")
    .map((x) => x.trim())
    .filter((x) => x.length > 1)
    .map((x) => x.toLowerCase());

  const p = (book?.Publisher ?? " ")
    .split(" ")
    .map((x) => x.trim())
    .filter((x) => x.length > 1)
    .map((x) => x.toLowerCase());

  // if(book.added_where == "IT") {
  //   console.log("\t" + a + " ~ " + book?.Title + ` (${p})\t\t\t\t${book.id}`);
  // } else {
  //   console.log("["+book.added_where + "]\t\t\t" + a + " ~ " + book?.Title + ` (${p})\t\t\t\t${book.id}`);
  // }

  return (
    a.map((x) => authors.includes(x)).filter((x) => x).length > 0 ||
    p.map((x) => publishers.includes(x)).filter((x) => x).length > 0
  );
};

function compareBook(a, b) {
  const nameA = a.Author.toUpperCase(); // ignore upper and lowercase
  const nameB = b.Author.toUpperCase(); // ignore upper and lowercase
  if (!nameA || !nameB) {
    return 0;
  }
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  return 0;
}

function run() {
  axios
    .get(
      "http://api.bookmooch.com/api/recent?o=json&inc=id+added_when+added_by+added_where+Author+Title+Publisher+Year",
    )
    .then((response) => {
      response.data
        .sort(compareBook)
        .filter((x) => x.Author.split(" ")[1])
        .forEach((x) => {
          const name = x.Author.split(" ")[0];
          const surname = x.Author.split(" ")[1];
          console.log(
            "[" +
              x.added_where +
              "]: " +
              surname +
              ", " +
              name +
              "; " +
              x.Title,
          );
        });

      const books = response.data
        .filter((x) => x.Author != null)
        .filter((x) => x.Author != "")
        // .filter((x) => x.added_where == "IT")
        .filter((x) => ifilter(x))
        .sort(compareBook);
      if (books.length > 0) {
        send(books);
      } else {
        console.log("empty list of books");
      }
    });
}
