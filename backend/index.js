const connectToMongo = require('./db')
const express = require('express')

connectToMongo();

const app = express()
const port = 3000

app.use(express.json());

// Avail Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Listening at Port: http://127.0.0.1:${port}`)
})
