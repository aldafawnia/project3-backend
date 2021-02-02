'use strict'

const Addresses = use('App/Models/Address')
const Users = use('App/Models/User')

class AddressController {
  async create({view}){
    return view.render('addresses/createnewaddress')
  }
}

module.exports = AddressController
