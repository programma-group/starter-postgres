const tableName = 'users';

exports.up = function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary();
    table.string('username').unique().notNull();
    table.string('email').unique().notNull();
    table.string('password', 60).notNull();
    table.string('firstName').notNull();
    table.string('lastName').notNull();
  });
};

exports.down = function down(knex) {
  return knex.schema.dropTableIfExists(tableName);
};
