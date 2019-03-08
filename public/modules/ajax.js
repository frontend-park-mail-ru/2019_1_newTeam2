'use strict'

const noop = () => null;

function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
	  return response
	} else {
	  var error = new Error(response.statusText)
	  error.response = response
	  throw error
	}
  }

export class AjaxModule {
	_ajax({
		callback = noop,
		method = 'GET',
		path = '/',
		body = {},
	} = {}) {
		fetch(path, {
			method: method,
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
				"Charset": "utf-8"
			},
			credentials: "include"
		  })
		  .then(checkStatus)
		  .then(function(response) {
			callback(response);
			return response.text()
		  })
		  .catch(function(error) {
			console.log('request failed', error)
		  })
	}

	doGet({
		callback = noop,
		path = '/',
		body = {},
	} = {}) {
		this._ajax({
			callback,
			path,
			body,
			method: 'GET',
		});
	}

	doPost({
		callback = noop,
		path = '/',
		body = {},
	} = {}) {
		this._ajax({
			callback,
			path,
			body,
			method: 'POST',
		});
	}
}
