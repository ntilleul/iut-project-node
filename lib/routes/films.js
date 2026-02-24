'use strict';

const Joi = require('joi');

module.exports = [

    {
        method: 'post',
        path: '/films',
        options: {
            tags: ['api'],
            auth: { scope: ['admin'] },
            validate: {
                payload: Joi.object({
                    title: Joi.string().required(),
                    description: Joi.string().required(),
                    releaseDate: Joi.date().required(),
                    director: Joi.string().required()
                })
            }
        },
        handler: async (request) => {

            const { filmService } = request.services();
            return await filmService.create(request.payload);
        }
    },

    {
        method: 'get',
        path: '/films',
        options: {
            tags: ['api'],
            auth: { scope: ['user', 'admin'] }
        },
        handler: async (request) => {

            const { filmService } = request.services();
            return await filmService.findAll();
        }
    },

    {
        method: 'patch',
        path: '/films/{id}',
        options: {
            tags: ['api'],
            auth: { scope: ['admin'] }
        },
        handler: async (request) => {

            const { filmService } = request.services();
            return await filmService.update(request.params.id, request.payload);
        }
    },

    {
        method: 'delete',
        path: '/films/{id}',
        options: {
            tags: ['api'],
            auth: { scope: ['admin'] }
        },
        handler: async (request) => {

            const { filmService } = request.services();
            return await filmService.delete(request.params.id);
        }
    },

    {
        method: 'post',
        path: '/films/export',
        options: {
            tags: ['api'],
            auth: { scope: ['admin'] }
        },
        handler: async (request) => {

            const { exportService } = request.services();

            return await exportService.exportFilms(
                request.auth.credentials.mail
            );
        }
    }
];