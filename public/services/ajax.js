'use strict';

import bus from './bus.js';
const bodyIncludesMethods = ['POST', 'PATCH', 'PUT', 'DELETE'];


// export const baseUrl = 'https://newteam2back.herokuapp.com/';
export const baseUrl = 'http://localhost:8090/';


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
    if (response.status >= 200 && response.status < 500) {
        return response;
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
};

class AjaxModule {
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
                'Content-Type': 'application/json',
                'Charset': 'utf-8'
            },
            credentials: 'include'
        };
        if (bodyIncludesMethods.includes(method)) {
            init.body = JSON.stringify(body);
        }
        return fetch(baseUrl + path, init)
            .then((response) => {
                if(response.status === 208) {
                    console.log(response);
                    setTimeout(bus.emit.bind(bus), 0, 'no-internet');
                }
                return response;
            }).then(checkStatus);
    }
    /** 
   * Simple wrapper on private _ajax function
	 * Makes a GET http request
	 *
	 * @throws {Error} if request status is not in [200:300)
	 *
	 * @param  {object} [unnamed = {}]
	 * @param  {string} [unnamed.path = '/']
	 *
	 * @returns {Promise}
	 */
    doGet({
        path = '/',
    } = {}) {
        return this._ajax({path: path});
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
	 *
	 * @returns {Promise}
	 */
    doDelete({
        path = '/',
        body = {}
    } = {}) {
        return this._ajax({
            path,
            body,
            method: 'DELETE',
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
    doPatch({
        path = '/',
        body = {},
    } = {}) {
        return this._ajax({
            path,
            body,
            method: 'PATCH',
        });
    }


    uploadAvatar({
        body
    } = {}) {
        const init = {
            method: 'POST',
            mode: 'cors',
            body: body,
            credentials: 'include'
        };
        return fetch(baseUrl + 'avatars/', init)
            .then(checkStatus);
    }
}

export default new AjaxModule();
