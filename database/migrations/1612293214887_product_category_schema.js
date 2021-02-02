'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductCategorySchema extends Schema {
  up () {
    this.create('product_categories', (table) => {
      table.increments()

      table.integer('product_id').unsigned().notNullable()
      table.foreign('product_id').references('products.id')

      table.integer('category_id').unsigned().notNullable()
      table.foreign('category_id').references('categories.id')

      table.timestamps()
    })
  }

  down () {
    this.drop('product_categories')
  }
}

module.exports = ProductCategorySchema
