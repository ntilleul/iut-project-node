'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');

module.exports = class FavoriteService extends Service {

    async add(userId, filmId) {

        const knex = this.server.knex();

        try {
            await knex('user_favorite_films').insert({ userId, filmId });
        }
        catch (err) {
            throw Boom.badRequest('Film already in favorites');
        }

        return { message: 'Added to favorites' };
    }

    async remove(userId, filmId) {

        const knex = this.server.knex();

        const deleted = await knex('user_favorite_films')
            .where({ userId, filmId })
            .del();

        if (!deleted) {
            throw Boom.badRequest('Film not in favorites');
        }

        return { message: 'Removed from favorites' };
    }
};