'use strict';

const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '../public/static')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
	return res;
});

let port = 3000;

app.listen(port, function () {
	console.log(`Server listening port ${port}`);
});
