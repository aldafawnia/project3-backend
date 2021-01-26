'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddToUserSchema extends Schema {
  up () {
    this.table('users', (table) => {
      // alter table
      table.string('full_name', 100).notNullable().unique()
      table.integer('contact_number').notNullable()
    })
  }

  down () {
    this.table('users', (table) => {
      // reverse alternations
      table.dropColumn('full_name')
      table.dropColumn('contact_number')
    })
  }
}

module.exports = AddToUserSchema
