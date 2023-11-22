// Создание таблицы для связи "Товары в заказе"
export const up = knex => {
    return knex.schema.createTable('order_items', table => {
        table.increments('id').primary()
        table.integer('order_id').unsigned().notNullable()
        table.foreign('order_id').references('orders.id')
        table.integer('nomenclature_id').unsigned().notNullable()
        table.foreign('nomenclature_id').references('nomenclature.id')
        table.integer('quantity').notNullable()
    })
}

export const down = knex => {
    return knex.schema.dropTable('order_items')
}