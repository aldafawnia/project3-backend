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

  async create({view}){
    return view.render('userscreate')
  }

  async processCreate({request,response}){
    let userData = request.post();
    let newUser = new Users();
    newUser.full_name = userData.fullname;
    newUser.username = userData.username;
    newUser.email = userData.email;
    newUser.password = userData.password;
    newUser.contact_number = userData.contact;
    await newUser.save()
    let newAddress = new Addresses();
    newAddress.building_name = userData.building_name;
    newAddress.street_name = userData.street_name;
    newAddress.unit_number = userData.unit_number;
    newAddress.postal_code = userData.postal_code;
    newAddress.country = userData.country;
    await newAddress.save()
    await newUser.addresses().attach(newAddress.id)
    response.route('show_all_users');
    // response.json(userData);
  }

  async update({view,params}){
    let user = await Users.find(params.users_id);
    return view.render('usersupdate',{
      'user': user.toJSON()
    })
  }
}

module.exports = UserController
