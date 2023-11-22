// import faker from 'faker'
import { faker } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'
// Функция для генерации случайных данных
const generateClientData = (count) => {
  const data = []
  for (let i = 0; i < count; i++) {
    data.push({
      name: faker.person.fullName(),
      address: faker.location.streetAddress(false),
    })
  }
  return data
}

export const seed = async knex => {
  // Заполнение таблицы "Категории"

  const techUUID = uuidv4()
  const pcUUID = uuidv4()
  const refregUUID = uuidv4()
  const refOne = uuidv4()
  const refTwo = uuidv4()
  const tv = uuidv4()
  const laptop = uuidv4()
  const categories = [
    {uuid: techUUID, name: 'Бытовая техника', path: `${techUUID.replace(/-/g, '')}` },
    {uuid: refregUUID, name: 'Холодильники', path: `${techUUID.replace(/-/g, '')}.${refregUUID.replace(/-/g, '')}` },
    {uuid: refOne, name: 'Однокамерные', path: `${techUUID.replace(/-/g, '')}.${refregUUID.replace(/-/g, '')}.${refOne.replace(/-/g, '')}` },
    {uuid: refTwo, name: 'Двухкамерные', path: `${techUUID.replace(/-/g, '')}.${refregUUID.replace(/-/g, '')}.${refTwo.replace(/-/g, '')}` },
    {uuid: tv, name: 'Телевизоры', path: `${techUUID.replace(/-/g, '')}.${tv.replace(/-/g, '')}` },
    {uuid: pcUUID, name: 'Компьютеры', path: `${pcUUID.replace(/-/g, '')}` },
    {uuid: laptop, name: 'Ноутбуки', path: `${pcUUID.replace(/-/g, '')}.${laptop.replace(/-/g, '')}` },
  ]
  

  const [categoryId1, categoryId2, categoryId3, categoryId4, categoryId5, categoryId6, categoryId7] = await knex('categories').insert(categories).returning('uuid')

  // Заполнение таблицы "Номенклатура"
  // const nomenclatureData = generateRandomData(10)
  const nomenclatureData = [
    { name: 'Холодильники Однокамерные Model 1', quantity: 10, price: 200 },
    { name: 'Холодильники Однокамерные Model 3', quantity: 20, price: 200 },
    { name: 'Холодильники Двухкамерные Model 1', quantity: 35, price: 300 },
    { name: 'Холодильники Двухкамерные Model 2', quantity: 2, price: 300 },
    { name: 'Холодильники Двухкамерные Model 4', quantity: 1, price: 300 },
    { name: 'Телевизоры', quantity: 15, price: 400 },
    { name: 'Ноутбуки', quantity: 20, price: 600 },
  ]
  const [nomenclatureId1, nomenclatureId2, nomenclatureId3, nomenclatureId4, nomenclatureId5, nomenclatureId6, nomenclatureId7, nomenclatureId8, nomenclatureId9, nomenclatureId10] = await knex('nomenclature').insert(nomenclatureData).returning('id')

  // Заполнение таблицы "Категории товаров"
  const nomenclatureCategories = [
    { nomenclature_id: nomenclatureId1.id, category_id: categoryId3.uuid },
    { nomenclature_id: nomenclatureId2.id, category_id: categoryId3.uuid },
    { nomenclature_id: nomenclatureId3.id, category_id: categoryId4.uuid },
    { nomenclature_id: nomenclatureId4.id, category_id: categoryId4.uuid },
    { nomenclature_id: nomenclatureId5.id, category_id: categoryId4.uuid },
    { nomenclature_id: nomenclatureId6.id, category_id: categoryId5.uuid },
    { nomenclature_id: nomenclatureId7.id, category_id: categoryId7.uuid },

  ]

  await knex('nomenclature_categories').insert(nomenclatureCategories)

  // Заполнение таблицы "Клиенты"
  const clientsData = generateClientData(5)
  const [clientId1, clientId2, clientId3, clientId4, clientId5] = await knex('clients').insert(clientsData).returning('id')

  // Заполнение таблицы "Заказы"
  const ordersData = [
    { client_id: clientId1.id },
    { client_id: clientId2.id },
    { client_id: clientId3.id },
    { client_id: clientId4.id },
    { client_id: clientId5.id },
  ]
  const [orderId1, orderId2, orderId3, orderId4, orderId5] = await knex('orders').insert(ordersData).returning('id')

  // Получаем реальные значения quantity из таблицы "Номенклатура"
  const nomenclatureQuantities = await knex('nomenclature').select('id', 'quantity')

  // Заполнение таблицы "Товары в заказе" с использованием данных из таблицы "Номенклатура"
  const orderItemsData = [
    { order_id: orderId1.id, nomenclature_id: nomenclatureId1.id, quantity: nomenclatureQuantities[0].quantity },
    { order_id: orderId2.id, nomenclature_id: nomenclatureId2.id, quantity: nomenclatureQuantities[1].quantity },
    { order_id: orderId2.id, nomenclature_id: nomenclatureId2.id, quantity: nomenclatureQuantities[0].quantity },
    { order_id: orderId2.id, nomenclature_id: nomenclatureId2.id, quantity: nomenclatureQuantities[4].quantity },
    { order_id: orderId3.id, nomenclature_id: nomenclatureId3.id, quantity: nomenclatureQuantities[2].quantity },
    { order_id: orderId4.id, nomenclature_id: nomenclatureId4.id, quantity: nomenclatureQuantities[3].quantity },
    { order_id: orderId5.id, nomenclature_id: nomenclatureId5.id, quantity: nomenclatureQuantities[4].quantity },
  ]
  await knex('order_items').insert(orderItemsData)

}