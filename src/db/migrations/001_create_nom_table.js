// Создание таблицы "Номенклатура"
export const up = knex => {
    return knex.schema.createTable('nomenclature', table => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.integer('quantity').notNullable()
        table.decimal('price', 10, 2).notNullable()

    })
}
export const down = knex => {
    return knex.schema.dropTable('nomenclature')
}
