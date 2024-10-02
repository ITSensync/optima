/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  
    return knex.schema.createTable('rfid', table => {
        table.increments('id').primary();
        table.string('uid').notNullable();
        table.datetime('created_at').defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());
        table.datetime('deleted_at').nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('rfid');
};
