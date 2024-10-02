/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('UserID').primary();
        table.string('UserName',255).notNullable();
        table.enu('Role', ['admin', 'user', 'guest']).notNullable().defaultTo('user');
        table.string('Credential', 255);
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
