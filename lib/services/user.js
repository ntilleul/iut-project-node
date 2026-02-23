'use strict';

const bcrypt = require('bcrypt');
const Boom = require('@hapi/boom');
const { Service } = require('@hapipal/schmervice');

module.exports = class UserService extends Service {

    async create(user) {
        const { User } = this.server.models();
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword;
        return await User.query().insertAndFetch(user);
    }

    findAll() {
        const { User } = this.server.models();
        return User.query();
    }

    async delete(id) {
        const { User } = this.server.models();
        return await User.query().deleteById(id);
    }

    async update(id, payload) {
        const { User } = this.server.models();
        if (payload.password) {
            const saltRounds = 10;
            payload.password = await bcrypt.hash(payload.password, saltRounds);
        }
        return await User.query()
            .patchAndFetchById(id, payload);
    }

    async login(mail, password) {
        const { User } = this.server.models();
        const user = await User.query().findOne({ mail });
        if (!user) {
            throw Boom.unauthorized('Invalid email or password');
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw Boom.unauthorized('Invalid email or password');
        }
        return { login: 'successful' };
    }
};