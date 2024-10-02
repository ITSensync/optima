/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    const addTimestamps = (tableName) => {
        return knex.schema.table(tableName, table => {
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
            table.timestamp('deleted_at').nullable();
        })
    }

    return Promise.all([
        addTimestamps('users'),
        addTimestamps('categories'),
        addTimestamps('locations'),
        addTimestamps('products'),
        addTimestamps('suppliers'),
        addTimestamps('transactions'),
        addTimestamps('rfid'),
    ])
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    const removeTimestamps = (tableName) => {
        return knex.schema.table(tableName, table => {
            table.dropColumn('created_at');
            table.dropColumn('updated_at');
            table.dropColumn('deleted_at');
        })
    }

    return Promise.all([
        removeTimestamps('users'),
        removeTimestamps('categories'),
        removeTimestamps('locations'),
        removeTimestamps('products'),
        removeTimestamps('suppliers'),
        removeTimestamps('transactions'),
        removeTimestamps('rifd'),
    ])
};
