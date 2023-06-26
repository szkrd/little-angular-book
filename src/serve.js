const express = require('express')
const app = express()
const port = process.env.port ?? 5000
app.use(express.static('docs'))
app.listen(port, () => {
  console.log(`Static express listening on port ${port}`)
})
