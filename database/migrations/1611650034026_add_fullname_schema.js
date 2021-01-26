'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddFullnameSchema extends Schema {
  up () {
    this.table('users', (table) => {
      // alter table
      table.string('full_name', 100).notNullable()
    })
  }

  down () {
    this.table('users', (table) => {
      // reverse alternations
      table.dropColumn('full_name')
    })
  }
}

module.exports = AddFullnameSchema
