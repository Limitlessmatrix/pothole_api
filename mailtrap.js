const {MailtrapClient} = require("mailtrap")
const dotenv = require("dotenv") 
console.log("what is dotenv", dotenv)
console.log("what is MailtrapClient", MailtrapClient)
dotenv.config()
console.log("what is process.env", process.env)
/**
 * For this example to work, you need to set up a sending domain,
 * and obtain a token that is authorized to send from the domain.
 */

const TOKEN = process.env.MAILTRAP_TOKEN;
const SENDER_EMAIL = process.env.MAILTRAP_EMAIL;
const RECIPIENT_EMAIL = "<RECIPIENT@EMAIL.COM>";

const client = new MailtrapClient({ token: TOKEN });

const sender = { name: "Mailtrap Test", email: SENDER_EMAIL };


client
  .send({
    from: sender,
    to: [{ email: RECIPIENT_EMAIL }],
    subject: "Reporting a pothole",
    text: "Hello I would like to report a pothole under your juristiction."
  })
  .then(console.log)
  .catch(console.error);