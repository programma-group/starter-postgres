const knex = require('knex');
const { Model } = require('objection');
const knexConfig = require('./knexfile');

const knexObject = knex(knexConfig.development);

/**
 * Creates a connection and tests it, according to https://github.com/tgriesser/knex/issues/1886
 * @returns {Promise} resolved if init was succesful
 */
const init = () => {
  Model.knex(knexObject);
  return knexObject.raw('select 1+1 as result');
};

module.exports = {
  init,
  knexObject,
};
