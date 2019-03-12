'use strict';

const CONFIG = require('../config.json');

/**
* Checks the status of http answer
* 
* @throws {Error} if request status is not in [200:300)
* 
* @param  {object} response
* 
* @returns {Promise}
*/
const checkStatus = response => {
	if (response.status >= 200 && response.status < 400) {
	  return response;
	} else {
	  let error = new Error(response.statusText);
	  error.response = response;
	  throw error;
	}
};

export class AjaxModule {
	/**
	 * Private _ajax function
	 * Makes a http request
	 * 
	 * @throws {Error} if request status is not in [200:300)
	 * 
	 * @param  {object} [unnamed = {}]
	 * @param  {string} [unnamed.method = 'GET']
	 * @param  {string} [unnamed.path = '/'] 
	 * @param  {object} [unnamed.body = {}]
	 * 
	 * @returns {Promise}
	 */
	_ajax ({
		method = 'GET',
		path = '/',
		body = {},
	} = {}) {
		let init = {
			method: method,
			mode: 'cors',
			headers: {
				"Content-Type": "application/json",
				"Charset": "utf-8"
			},
			credentials: "include"
		};
		if (method === "POST")
			init.body = JSON.stringify(body);
		return fetch(CONFIG.baseUrl + path + '/', init)
			.then(checkStatus);
	}
	/**
	 * Simple wrapper on private _ajax function
	 * Makes a GET http request
	 *
	 * @throws {Error} if request status is not in [200:300)
	 *
	 * @param  {object} [unnamed = {}]
	 * @param  {string} [unnamed.path = '/']
	 * @param  {object} [unnamed.body = {}]
	 *
	 * @returns {Promise}
	 */
	doGet({
		path = '/',
	} = {}) {
		return this._ajax({path: path})
	}
	/**
	 * Simple wrapper on private _ajax function
	 * Makes a POST http request
	 * 
	 * @throws {Error} if request status is not in [200:300)
	 * 
	 * @param  {object} [unnamed = {}] 
	 * @param  {string} [unnamed.path = '/'] 
	 * @param  {object} [unnamed.body = {}]
	 * 
	 * @returns {Promise}
	 */
	doPost({
		path = '/',
		body = {},
	} = {}) {
		return this._ajax({
			path,
			body,
			method: 'POST',
		});
	}
	/**
	 * Simple wrapper on private _ajax function
	 * Makes a PUT http request
	 * 
	 * @throws {Error} if request status is not in [200:300)
	 * 
	 * @param  {object} [unnamed = {}] 
	 * @param  {string} [unnamed.path = '/'] 
	 * @param  {object} [unnamed.body = {}]
	 * 
	 * @returns {Promise}
	 */
	doPut({
		path = '/',
		body = {},
	} = {}) {
		return this._ajax({
			path,
			body,
			method: 'PUT',
		});
	}
	/**
	 * Simple wrapper on private _ajax function
	 * Makes a DELETE http request
	 * 
	 * @throws {Error} if request status is not in [200:300)
	 * 
	 * @param  {object} [unnamed = {}] 
	 * @param  {string} [unnamed.path = '/'] 
	 * @param  {object} [unnamed.body = {}]
	 * 
	 * @returns {Promise}
	 */
	doDelete({
		path = '/',
	} = {}) {
		return this._ajax({
			path,
			method: 'DELETE',
		});
	}
}
