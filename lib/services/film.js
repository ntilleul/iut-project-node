'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');

module.exports = class FilmService extends Service {

    async create(payload) {

        const { Film } = this.server.models();
        const { mailService } = this.server.services();

        const film = await Film.query().insertAndFetch(payload);

        // Notification globale
        await mailService.notifyAllUsersNewFilm(film);

        return film;
    }

    async findAll() {

        const { Film } = this.server.models();
        return await Film.query();
    }

    async findById(id) {

        const { Film } = this.server.models();

        const film = await Film.query().findById(id);

        if (!film) {
            throw Boom.notFound('Film not found');
        }

        return film;
    }

    async update(id, payload) {

        const { Film } = this.server.models();
        const { mailService } = this.server.services();

        const film = await Film.query().patchAndFetchById(id, payload);

        if (!film) {
            throw Boom.notFound('Film not found');
        }

        await mailService.notifyUsersFilmUpdated(film);

        return film;
    }

    async delete(id) {

        const { Film } = this.server.models();

        const deleted = await Film.query().deleteById(id);

        if (!deleted) {
            throw Boom.notFound('Film not found');
        }

        return '';
    }
};