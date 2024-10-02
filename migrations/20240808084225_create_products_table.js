/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('products', table => {
    table.increments('ProductID').primary();
    table.string('ProductName', 255).notNullable();
    table.text('Description');
    table.integer('CategoryID').unsigned().references('CategoryID').inTable('categories');
    table.integer('Price').notNullable();
    table.integer('StockQuantity').notNullable();
    table.integer('LocationID').unsigned().references('LocationID').inTable('locations');
    table.string('RfidTagID', 255);
  });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('products');
};
