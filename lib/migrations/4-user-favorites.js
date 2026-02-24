'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.createTable('user_favorite_films', (table) => {

            table.increments('id').primary();

            table.integer('userId').unsigned().references('id').inTable('user').onDelete('CASCADE');
            table.integer('filmId').unsigned().references('id').inTable('film').onDelete('CASCADE');

            table.unique(['userId', 'filmId']);

            table.dateTime('createdAt').defaultTo(knex.fn.now());
        });
    },

    async down(knex) {
        await knex.schema.dropTableIfExists('user_favorite_films');
    }
};