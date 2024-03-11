const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const bodyParser = require('body-parser');

const PORT = process.env.PORT | 3001;

const server = express();

server.set("views", path.join(__dirname, 'views'))
server.set("view engine", "ejs")

let entries = [];
server.locals.entries = entries;

server.use(bodyParser.urlencoded({ extended: false }));

server.use(logger)

server.get('/', (req, res) => {
	res.render('index')
})

server.get('/new-entry', (req, res) => {
	res.render('new-entry')
})

server.post('/new-entry', (req, res) => {
	if (!req.body.title || !req.body.body) {
		res.status(400).send("Enteries must have a title and a body.")
		return;
	}
	entries.push({
		title: req.body.title,
		content: req.body.body,
		published: new Date()
	});
	res.redirect("/");
})

server.use((req, res) => res.status(404).render('404'))

server.listen(PORT, () => console.log(`Server Listening on port ${PORT}`));