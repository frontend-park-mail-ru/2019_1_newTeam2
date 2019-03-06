'use strict'

const argError = -1;

if (process.argv.length < 4) {
	console.log('Not enough arguments');
	console.log('Usage: source file(*.pug) destination file(*.js)')
	return argError;
}

const fs = require('fs');
const path = require('path');
const pug = require('pug');



// Compile the template to a function string
const jsFunctionString = pug.compileFileClient(process.argv[2], {name: path.parse(process.argv[2]).name});

// write to out file
fs.writeFileSync(process.argv[3], jsFunctionString);
