'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'get',
        path: '/users',
        options: {
            tags: ['api'],
            description: 'Get users list'
        },
        handler: async (request, h) => {

            return [
                { firstName: 'John', lastName: 'Doe' },
                { firstName: 'Jane', lastName: 'Smith' }
            ];
        }
    },
    {
        method: 'post',
        path: '/user',
        options: {
            tags: ['api'],
            description: 'Create a user',
            validate: {
                payload: Joi.object({
                    firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                    lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user')
                })
            }
        },
        handler: async (request, h) => {

            const { User } = request.models();

            const user = await User.query().insertAndFetch({
                firstName: request.payload.firstName,
                lastName: request.payload.lastName
            });

            return user;
        }
    }
];