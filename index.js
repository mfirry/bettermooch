import axios from "axios";

import send from "./mailer.js";
import { authors, publishers } from "./config.js";

const filter = (book) => {
  const a = book.Author.split(" ")
    .map((x) => x.trim())
    .filter((x) => x.length > 1)
    .map((x) => x.toLowerCase());
  const p = book.Publisher.split(" ")
    .map((x) => x.trim())
    .filter((x) => x.length > 1)
    .map((x) => x.toLowerCase());

  console.log(a + " ~ " + book?.Title + ` (${p})\t\t\t\t${book.id}`);

  return (
    a.map((x) => authors.includes(x)).filter((x) => x).length > 0 ||
    p.map((x) => publishers.includes(x)).filter((x) => x).length > 0
  );
};

axios
  .get(
    "http://api.bookmooch.com/api/recent?o=json&inc=id+added_when+added_by+added_where+Author+Title+Publisher+Year"
  )
  .then((response) => {
    const books = response.data
      .filter((x) => x.Author != null)
      .filter((x) => x.Author != "")
      .filter((x) => x.Publisher != null)
      .filter((x) => x.Publisher != "")
      .filter((x) => x.added_where == "IT")
      .filter((x) => filter(x));
    if (books.length > 0) {
      send(books);
    } else {
      console.log("empty list of books");
    }
  });
