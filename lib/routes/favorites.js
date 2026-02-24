'use strict';

module.exports = [

    {
        method: 'post',
        path: '/films/{id}/favorite',
        options: {
            tags: ['api'],
            auth: { scope: ['user', 'admin'] }
        },
        handler: async (request) => {

            const { favoriteService } = request.services();

            return await favoriteService.add(
                request.auth.credentials.id,
                request.params.id
            );
        }
    },

    {
        method: 'delete',
        path: '/films/{id}/favorite',
        options: {
            tags: ['api'],
            auth: { scope: ['user', 'admin'] }
        },
        handler: async (request) => {

            const { favoriteService } = request.services();

            return await favoriteService.remove(
                request.auth.credentials.id,
                request.params.id
            );
        }
    }
];