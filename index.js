const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');

const PORT = process.env.PORT | 3001;

const server = express();

server.set("views",path.join(__dirname, 'views'))
server.set("view engine","ejs")

let entries = [];
server.locals.entries = entries;

server.use(logger)

server.get('/', (req, res) => {
    res.render('index')
})

server.get('/new-entry', (req, res) => {
    res.render('new-entry')
})


server.listen(PORT, () => console.log(`Server Listening on port ${PORT}`));