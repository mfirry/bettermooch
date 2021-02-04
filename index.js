import axios from "axios";

import send from "./mailer.js";
import { authors, publishers } from "./config.js";

axios
  .get(
    "http://api.bookmooch.com/api/recent?o=json&inc=id+added_when+added_by+added_where+Author+Title+Publisher+Year"
  )
  .then((response) => {
    response.data
      .filter((x) => x.added_where == "IT")
      .filter((x) => {
        return (
          authors.includes(x.Author?.toLowerCase()) ||
          publishers.includes(x.Publisher?.toLowerCase())
        );
      })
      .forEach(b => send(b));
  });
