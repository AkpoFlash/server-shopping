const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const port = 3000;

app.use((request, response, next) => {
	console.log(request.headers);
	next();
});

app.use((request, response, next) => {
	request.change = Math.random();
	next();
});

app.use((error, request, response, next) => {
	console.log(error);
	response.status(500).send('Something broke!');
});

app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	extname: '.hbs',
	layoutsDir: path.join(__dirname, 'views/layouts'),
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views/chunks'));

app.get('/', (request, response) => {
	response.render('home', {
		name: 'Sam',
	});
})

app.listen(port, (err, data) => {
	if( err ){
		throw 'Error';
	}

	console.log(`server listening on ${port}`);
});