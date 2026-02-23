'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.alterTable('user', (table) => {

            table.string('username').notNullable().unique();
            table.string('mail').notNullable().unique();
            table.string('password').notNullable();
        });
    },

    async down(knex) {

        await knex.schema.alterTable('user', (table) => {

            table.dropColumn('username');
            table.dropColumn('mail');
            table.dropColumn('password');
        });
    }
};