'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddressSchema extends Schema {
  up () {
    this.create('addresses', (table) => {
      table.increments()
      table.string('building_name', 150).notNullable()
      table.string('street_name', 200).notNullable()
      table.string('unit_number', 20).notNullable()
      table.string('postal_code', 15).notNullable()
      table.string('country', 50).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('addresses')
  }
}

module.exports = AddressSchema
