'use strict';

module.exports = {
    method: 'GET',
    path: '/user',
    options: {
        handler: async (request, h) => {
            return { firstName: 'John', lastName: 'Doe' };
        }
    }
};
