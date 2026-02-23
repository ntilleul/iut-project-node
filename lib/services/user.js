'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class UserService extends Service {

    create(user) {
        const { User } = this.server.models();
        return User.query().insertAndFetch(user);
    }

    findAll() {
        const { User } = this.server.models();
        return User.query();
    }

    async delete(id) {
        const { User } = this.server.models();
        return await User.query().deleteById(id);
    }

};