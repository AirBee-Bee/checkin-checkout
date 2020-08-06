const express = require('express');
let app = express();


app.get('/', (req, res) => {
  res.send('Hello World!')
})

const port = 5000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})