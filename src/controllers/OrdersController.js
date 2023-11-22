import { pg } from '../db/knexConfig.js'
import knex from 'knex'
import { ApiError } from '../error/ApiError.js'

export const OrdersController = {
    getСlients: async (req, resp, next) => {
        try {
            const knexInstance = knex(pg)
            const result = await knexInstance('clients')
                .select('clients.id', 'clients.name')
                .leftJoin('orders', 'clients.id', 'orders.id')
                .leftJoin('order_items', 'orders.id', 'order_items.order_id')
                .leftJoin('nomenclature_categories', 'order_items.nomenclature_id', 'nomenclature_categories.nomenclature_id')
                .groupBy('clients.id', 'clients.name')
                .sum('order_items.quantity as total_ordered')
        
            console.log(result)
            resp.json(result)
        } catch (e) {
            console.log(e)
        }

    },
    getСount: async (req, resp, next) => {
        try {
            const knexInstance = knex(pg)

            //const result = await knexInstance.raw('Select c.uuid, count(child.uuid), c.name From categories c Left Join categories child on child.path <@ c.path and nlevel(child.path) = nlevel(c.path)+1 Group by c.uuid')
            const result = await knexInstance('categories as c')
                .select('c.uuid', knexInstance.raw('count(child.uuid) as child_count'), 'c.name')
                .leftJoin('categories as child', function () {
                    this.on(knexInstance.raw('child.path <@ c.path AND nlevel(child.path) = nlevel(c.path) + 1'))
                })
                .groupBy('c.uuid', 'c.name')
        
            console.log(result)
            resp.json(result)
        } catch (e) {
            console.log(e)
        }

    }
}



