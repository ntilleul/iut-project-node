'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'get',
        path: '/users',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api']
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            return await userService.findAll();
        }
    },
    {
        method: 'post',
        path: '/user',
        options: {
            auth: false,
            tags: ['api'],
            description: 'Create a user',
            validate: {
                payload: Joi.object({
                    username: Joi.string().min(3).required(),
                    mail: Joi.string().email().required(),
                    password: Joi.string().min(8).required(),
                    firstName: Joi.string().min(3).required(),
                    lastName: Joi.string().min(3).required()
                })
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            return await userService.create(request.payload);
        }
    },
    {
        method: 'delete',
        path: '/user/{id}',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().positive().required()
                })
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            await userService.delete(request.params.id);

            return '';
        }
    },
    {
        method: 'patch',
        path: '/user/{id}',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().positive().required()
                }),
                payload: Joi.object({
                    username: Joi.string().min(3).optional(),
                    mail: Joi.string().email().optional(),
                    password: Joi.string().min(8).optional(),
                    firstName: Joi.string().min(3).optional(),
                    lastName: Joi.string().min(3).optional()
                })
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            return await userService.update(request.params.id, request.payload);
        }
    },
    {
        method: 'post',
        path: '/user/login',
        options: {
            auth: false,
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    mail: Joi.string().email().required(),
                    password: Joi.string().min(8).required()
                })
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            return await userService.login(
                request.payload.mail,
                request.payload.password
            );
        }
    },
    {
        method: 'patch',
        path: '/user/{id}/admin',
        options: {
            tags: ['api'],
            auth: {
                scope: ['admin']
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            return await userService.promoteToAdmin(request.params.id);
        }
    }
];