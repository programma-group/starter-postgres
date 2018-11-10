const knex = require('knex');
const { Model } = require('objection');
const knexConfig = require('./knexfile');

const knexObject = knex(knexConfig.development);

const init = () => Model.knex(knexObject);

module.exports = init;
