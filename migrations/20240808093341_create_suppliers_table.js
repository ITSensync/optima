/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('suppliers', table => {
        table.increments('SupplierID').primary();
        table.string('SupplierName',255).notNullable();
        table.string('ContactInfo', 255);
        table.text('Address');
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('suppliers');
};
