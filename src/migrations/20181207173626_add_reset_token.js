
exports.up = function up(knex) {
  return knex.schema.table('users', (table) => {
    table.string('resetPasswordToken', 60).nullable();
    table.dateTime('resetPasswordExpires').nullable();
  });
};

exports.down = function down(knex) {
  return knex.schema.table('users', (table) => {
    table.dropColumn('resetPasswordToken');
    table.dropColumn('resetPasswordExpires');
  });
};
