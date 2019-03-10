'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid/v4');
const path = require('path');
const app = express();



app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(body.json());
app.use(cookie());



// menu
app.get('/menu', function (req, res) {
	return res.status(200).json({message: 'Menu'});
});



// user
app.post('/signup', function (req, res, next) {
	const username = req.body.username;
	const password = req.body.password;
	const email = req.body.email;
	if (
		!password || !email || !username
	) {
		return res.status(400).json({error: 'Невалидные данные пользователя'});
	} else {
		return res.status(200).end();
	}
});

app.post('/login', function (req, res) {
	const password = req.body.password;
	const username = req.body.username;

	if (!password || !username) {
		return res.status(400).json({error: 'Не указан логин или пароль'});
	}
	if (username != 'login' || password != 'pass') {
		return res.status(400).json({error: 'Неверный логин или пароль'});
	} else {
		return res.status(200).end();
	}
});

app.get('/me', function (req, res) {
	return res.status(200).json({message: 'Profile of logined user'});

});

app.get('/users/:userId(\\d+)', function (req, res) {
	return res.status(200).json({
		ID: req.params.userId,
		Username: 'myUsername',
		Email: 'myEmail',
		LangID: '0',
		PronounceON: '0',
		Score: '0',
		Avatar: 'someUrl'
	});

});

//HARDCODE, TODELETE!!!!!
app.get('/users', function (req, res) {
	return res.status(200).json([
		{
			'username': 'Vova',
			'score': -3
		},
		{
			'username': 'Sergey',
			'score': 52
		},
		{
			'username': 'Irina',
			'score': 56
		},
		{
			'username': 'Alex',
			'score': 41
		}
	]);

});


// dictionary
app.get('/dictionaries', function (req, res) {
	return res.status(200).json([
		{
			name: 'Dict1',
			id: '1',
		},
		{
			name: 'Dict2',
			id: '2',
		},
		{
			name: 'Dict3',
			id: '3',
		},
		{
			name: 'Dict4',
			id: '4',
		},
		{
			name: 'Dict5',
			id: '5',
		},
	]);
});


app.get('/dictionaries/:dictionaryId(\\d+)', function (req, res) {
	return res.status(200).json({message: 'Dictionary', id: req.params.dictionaryId});
	
});

app.get('/dictionaries/add', function (req, res) {
	return res.status(200).json({message: 'Page of adding a dictionary'});
	
});

app.get('/dictionaries/add/import', function (req, res) {
	return res.status(200).json({message: 'Page of importing a dictionary'});
	
});



// card
app.get('/dictionaries/:dictionaryId(\\d+)/add', function (req, res) {
	return res.status(200).json({message: 'Add a card', dictionaryId: req.params.dictionaryId});
	
});



// training
app.get('/training/choose', function (req, res) {
	return res.status(200).json({message: 'Training choose page'});
	
});

app.get('/training/play', function (req, res) {
	return res.status(200).json({message: 'Training play page'});
	
});



const port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log(`Server listening port ${port}`);
});