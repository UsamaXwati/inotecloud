const connectToMongo = require('./db')
const express = require('express')
connectToMongo();

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Listening at Port: http://127.0.0.1:${port}`)
})
