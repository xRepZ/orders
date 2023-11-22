// Создание таблицы "Клиенты"
export const up = knex => {
    return knex.schema.createTable('clients', table => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.string('address').notNullable()
    })
}

export const down = knex => {
    return knex.schema.dropTable('clients')
}