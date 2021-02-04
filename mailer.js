import Mailgun from "mailgun.js";
import formData from "form-data";

const sandbox = "sandbox08d47450de6149b7a89e7f0fab83d6f6.mailgun.org";
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || "key-yourkeyhere",
});

const send = (book) => {
  mg.messages
    .create(sandbox, {
      from: "BettermoochJS <nobody@example.com>",
      to: ["mfirry@gmail.com"],
      subject: "Bettermooch just found something!",
      text: `${book.Title} - http://www.bookmooch.com/detail/${book.id} - ${book?.Publisher}`,
      html: `<a href="http://www.bookmooch.com/detail/${book.id}">${book.Title} -  ${book?.Publisher}</a>`,
    })
    .then((msg) => console.log(msg)) // logs response data
    .catch((err) => console.log(err)); // logs any error
};

export default send;
