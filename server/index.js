const express = require('express');
const router = express.Router();
const Room = require('../database/index.js');
let app = express();

app.use('/listing', express.static(__dirname + '/../public'));
app.use(express.json())


app.get('/listing/:id', (req, res) => {
  var value = parseInt(req.params.id);
  Room.find({ uniqueId: value} )
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