'use strict';

class Users {
    #usersDb = [{
        id: "1",
        name: 'Bob',
        lastname: 'Doe'
    }, {
        id: "2",
        name: 'John',
        lastname: 'Doe'
    }];

    add(name, lastname) {
        const user = {
            id: this.#usersDb.length + 1,
            name: name,
            lastname: lastname
        };
        this.#usersDb.push(user);
        return user;
    }

    all() {
        return this.#usersDb;
    }

    delete(id) {
        this.#usersDb = this.#usersDb.filter(u => u.id !== id);
    }

    get(id) {
        return this.#usersDb.find(u => u.id === id);
    }
}

module.exports = new Users();