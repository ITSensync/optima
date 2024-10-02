/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('transactions', table => {
        table.increments('TransactionID').primary();
        table.integer('ProductID').unsigned().references('ProductID').inTable('products');
        table.integer('Quantity').notNullable();
        table.datetime('TransactionDate').notNullable(); 
        table.enu('TransactionType', ['IN', 'OUT']).notNullable().defaultTo('IN');
        table.integer('UserID').unsigned().references('UserID').inTable('users');
        table.integer('LocationID').unsigned().references('LocationID').inTable('locations');
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('transactions');
};
