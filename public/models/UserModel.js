import ajax from "../services/ajax.js";
import bus from "../services/bus.js";


export class UserModel {
    constructor(
        data = {
            "id": 0,
            "username": "string",
            "email": "string",
            "langID": 0,
            "pronounceOn": 0,
            "score": 0
        }
    ) {
        this.url = 'users';
        this.data = data;
    }

    getUser(id = 0) {
        ajax.doGet({
            path: this.url + '/' + id.toString(10)
        })
            .then(
                (res) => {
                    res.json()
                        .then(
                            (res) => {
                                setTimeout(bus.emit, 0, 'user-loaded', res);
                            },
                            (err) => {
                                console.log(err);
                            }
                        );
            },
                (err) => {
                    console.log(err)
                });
    }

    getSelf() {
        ajax.doGet({
            path: this.url + '/'
        })
            .then(
                (res) => {
                    res.json()
                        .then(
                            (res) => {
                                setTimeout(bus.emit, 0, 'user-loaded', res);
                            },
                            (err) => {
                                console.log(err);
                            }
                        );
                },
                (err) => {
                    console.log(err)
                });
    }

    getUsers(rows = 10, page = 1) {
        ajax.doGet({
            path: this.url + `?rows=${rows}&page=${page}`
        })
            .then(
                (res) => {
                    res.json()
                        .then(
                            (res) => {
                                setTimeout(bus.emit, 0, 'users-loaded', res);
                            },
                            (err) => {
                                console.log(err);
                            }
                        );
                },
                (err) => {
                    console.log(err)
                });
    }

    updateUser(id = 0, body) {
        ajax.doPut({
            path: this.url + '/',
            body: body
        }).then(
            () => {
                bus.emit('user-updated');
            },
            (error) => {
                bus.emit('update-user-error', error);
                console.log("some shit happened: " + error);
            }
        );
    }

    createUser(body) {
        ajax.doPost({
            path: this.url + '/',
            body: body
        })
            .then((response) => {
                bus.emit('user-created');
            })
            .catch ((error) => {
                bus.emit('create-user-error', error);
            });
    }

    deleteUser(id = 0) {
        ajax.doDelete({
            path: this.url + '/' + id.toString(10)
        })
            .then(() => {
                    bus.emit('user-deleted');
                }
            )
            .catch((error) => {
                    bus.emit('delete-user-error', error);
                }
            )
    }
}