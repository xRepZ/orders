// Создание таблицы "Категории"
export const up = knex => {
    return knex.schema.raw('CREATE EXTENSION IF NOT EXISTS ltree').then(() => {
        return knex.schema.createTable('categories', table => {
            table.uuid('uuid').defaultTo(knex.raw('gen_random_uuid()')).primary()
            table.string('name').notNullable()
            table.specificType('path', 'ltree').notNullable()
        })
    })
}

export const down = knex => {
    return knex.schema.dropTable('categories').then(() => {
        return knex.schema.raw('DROP EXTENSION IF EXISTS ltree')
    })
}