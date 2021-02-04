import Mailgun from "mailgun.js";
import formData from "form-data";

const sandbox = "sandbox08d47450de6149b7a89e7f0fab83d6f6.mailgun.org";
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || "key-yourkeyhere",
});

const text = (books) => {
  return books
    .map(
      (book) =>
        `${book?.Author} - ${book.Title} (${book?.Publisher}): http://www.bookmooch.com/detail/${book.id}`
    )
    .join("\n");
};

const html = (books) => {
  const text = books
    .map(
      (book) =>
        `<p><a href="http://www.bookmooch.com/detail/${book.id}">${book?.Author}: ${book.Title} (${book?.Publisher})</a></p>`
    )
    .join("\n");
  return text;
};

const send = (books) => {
  mg.messages
    .create(sandbox, {
      from: "BettermoochJS <Bettermooch@BettermoochJS.com>",
      to: ["mfirry@gmail.com", "afirry@gmail.com"],
      subject: "Bettermooch just found something!",
      text: text(books),
      html: html(books),
    })
    .then((msg) => console.log(msg)) // logs response data
    .catch((err) => console.log(err)); // logs any error
};

export default send;
