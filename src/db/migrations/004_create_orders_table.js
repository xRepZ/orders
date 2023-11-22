export const up = knex => {
    return knex.schema.createTable('orders', table => {
        table.increments('id').primary()
        table.integer('client_id').unsigned().notNullable()
        table.foreign('client_id').references('clients.id')
        table.timestamp('order_date').defaultTo(knex.fn.now())
    })
}

export const down = knex => {
    return knex.schema.dropTable('orders')
}