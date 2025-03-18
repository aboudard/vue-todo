// simple express server with /hello route returning a json response
const express = require('express')

const app = express()
app.use(express.json())

const port = 4000

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello World!' })
})

app.post('/pouf', (req, res) => {
  res.send({ message: req.body.message })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
