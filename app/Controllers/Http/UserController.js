'use strict'

const Users = use('App/Models/User')
const Addresses = use('App/Models/Address')

class UserController {

  async api({response,params}){
    // let users = await Users.all()
    let users = await Users.query().with('addresses').fetch()
    response.json(users)
  }

  async index({view}){
    // let users = await Users.all()
    let users = await Users.query().with('addresses').fetch()
    return view.render('userdata',{
      'users': users.toJSON(),
    })
  }
}

module.exports = UserController
