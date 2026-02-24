'use strict';

const { Service } = require('@hapipal/schmervice');
const nodemailer = require('nodemailer');

module.exports = class MailService extends Service {

    constructor(...args) {
        super(...args);

        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });
    }

    async sendWelcomeMail(user) {

        await this.transporter.sendMail({
            from: process.env.MAIL_FROM,
            to: user.mail,
            subject: 'Bienvenue 🎉',
            text: `Bienvenue ${user.username} !`
        });
    }
    async notifyAllUsersNewFilm(film) {
        const { User } = this.server.models();
        const users = await User.query();
        for (const user of users) {
            await this.transporter.sendMail({
                from: process.env.MAIL_FROM,
                to: user.mail,
                subject: 'Nouveau film disponible 🎬',
                text: `Le film ${film.title} vient d'être ajouté !`
            });
        }
    }

    async notifyUsersFilmUpdated(film) {
        const knex = this.server.knex();
        const users = await knex('user_favorite_films')
            .join('user', 'user.id', 'user_favorite_films.userId')
            .where('filmId', film.id)
            .select('user.mail');

        for (const user of users) {
            await this.transporter.sendMail({
                from: process.env.MAIL_FROM,
                to: user.mail,
                subject: 'Film mis à jour 🎬',
                text: `Le film ${film.title} a été modifié.`
            });
        }
    }
};