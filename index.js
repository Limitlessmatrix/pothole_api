const fs = require('node:fs')
const express = require('express')
const formidable = require('formidable').default
const EXIF = require('exif-js')
const app = express()
console.log('what is exif?', EXIF)

const loggingMiddleWare = (request, response, next) => {
  console.log(`method: ${request.method}, path: ${request.url}`)
  if (request.method === "POST" && request.url === "/admin") {
    response.json({ error: "NO YOU DONT" })
  } else { 
    next() 
  }
}

app.use(loggingMiddleWare)
app.use(express.static('public'))

let message = "Getting swifty"
app.get('/secret', function (req, res) {
  res.send(message)
})

app.post('/submit', function (req, res, next) {
  console.log("what is the request body?", req)
  const form = formidable({});

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    const file = files.image[0];
    console.log("What is file", file)
    if (file){
      const filebuffer = fs.readFileSync(file.filepath)
      const exifdata = EXIF.readFromBinaryFile(filebuffer.buffer)
      console.log("What is exifdata", exifdata)
    }
    res.json({ fields, files });
  });
})

app.listen(3000)