'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Address extends Model {
  users(){
    return this.belongsToMany('App/Models/User').pivotTable('user_addresses')
  }
}

module.exports = Address
