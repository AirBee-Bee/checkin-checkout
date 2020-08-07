const express = require('express');
const router = express.Router();
let db = require('../database/index.js');
let app = express();


app.use(express.static(__dirname + '/../public'));


app.get(`/listing/${id}`, (req, res) => {
  res.send('Hello World')
})

const port = 5000;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})