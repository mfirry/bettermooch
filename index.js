import axios from "axios";

import send from "./mailer.js";
import { authors, publishers } from "./config.js";

const filter = (x) => {
  const a = x.Author.split(" ")
    .map((x) => x.trim())
    .filter((x) => x.length > 1)
    .map((x) => x.toLowerCase());
  const p = x.Publisher.split(" ")
    .map((x) => x.trim())
    .filter((x) => x.length > 1)
    .map((x) => x.toLowerCase());

  console.log(a + " " + p);

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
    send(books);
  });
