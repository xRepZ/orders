export const up = knex => {
    return knex.schema.createTable('nomenclature_categories', table => {
        table.increments('id').primary()
        table.integer('nomenclature_id').unsigned().notNullable()
        table.foreign('nomenclature_id').references('nomenclature.id')
        table.uuid('category_id').notNullable()
        table.foreign('category_id').references('categories.uuid')
    })
}

export const down = knex => {
    return knex.schema.dropTable('nomenclature_categories')
}