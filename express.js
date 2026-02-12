const express = require('express')
const app = express()

const port = process.env.PORT || 5000

app.get('/', (req, res) => {
    console.log('user hit the resource')
    res.status(200).send('home page')
})
app.get('/about', (req, res) => {
    res.status(200).send('about page')
})
// catch-all for unmatched routes
app.use((req, res) => {
    res.status(404).send('<h1>resource not found</h1>')
})

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})