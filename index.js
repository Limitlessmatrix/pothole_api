const express = require('express')
const formidable = require('formidable').default
const app = express()
const urlDecodingMiddleware = express.urlencoded()
app.use(express.static('public'))

let message = "Getting swifty"
app.get('/secret', function (req, res) {
  res.send(message)
})
app.post('/submit', urlDecodingMiddleware, function (req, res) {
  console.log("what is the request body?", req)
  const form = formidable({});

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ fields, files });
  });
})

app.listen(3000)