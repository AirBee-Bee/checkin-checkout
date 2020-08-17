const express = require('express');
const router = express.Router();
const path = require('path');
const Room = require('../database/index.js');
const cors = require('cors');

let app = express();

app.use(express.json());
app.use(cors());

app.get('/listing/:id', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, '../public')});
});

app.get('/public/bundle.js', (req, res) => {
  res.sendFile('bundle.js', {root: path.join(__dirname, '../public')});
});


app.get('/listing/:id/rooms', (req, res) => {
  var value = parseInt(req.params.id);
  Room.find({ uniqueId: value})
    .then((rooms) => {
      res.send(rooms)
    })
    .catch((err) => {
      console.log('error in app.get in server');
      throw err;
    })
})

const port = 5000;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})