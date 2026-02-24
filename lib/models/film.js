'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Film extends Model {

    static get tableName() {
        return 'film';
    }

    static get joiSchema() {

        return Joi.object({

            id: Joi.number().integer(),

            title: Joi.string().min(2).required(),
            description: Joi.string().min(10).required(),
            releaseDate: Joi.date().required(),
            director: Joi.string().min(3).required(),

            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    $beforeInsert() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    $beforeUpdate() {
        this.updatedAt = new Date();
    }
};