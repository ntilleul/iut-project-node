'use strict';

const { Service } = require('@hapipal/schmervice');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

module.exports = class ExportService extends Service {

    async exportFilms(adminEmail) {

        const { Film } = this.server.models();
        const { mailService } = this.server.services();

        const films = await Film.query();

        const csvWriter = createCsvWriter({
            path: './films.csv',
            header: [
                { id: 'title', title: 'Title' },
                { id: 'description', title: 'Description' },
                { id: 'releaseDate', title: 'Release Date' },
                { id: 'director', title: 'Director' }
            ]
        });

        await csvWriter.writeRecords(films);

        await mailService.transporter.sendMail({
            from: process.env.MAIL_FROM,
            to: adminEmail,
            subject: 'Export CSV Films',
            text: 'Voici votre export CSV.',
            attachments: [
                { filename: 'films.csv', path: './films.csv' }
            ]
        });

        return { message: 'Export envoyé par mail.' };
    }
};