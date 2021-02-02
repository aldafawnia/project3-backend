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
    return view.render('users/userdata',{
      'users': users.toJSON(),
    })
  }

  async create({view}){
    return view.render('users/userscreate')
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
    let user = await Users.find(params.id);
    // let address = await Addresses.find(params.users_id)
    // let user = await address.users().with('addresses').fetch()
    return view.render('users/usersupdate',{
      'user': user.toJSON()
    })
    // return user.toJSON()
  }

  async processUpdate({request,response,params}){
    let updateUser = await Users.find(params.id);
    let userData = request.post();
    updateUser.full_name = userData.fullname;
    updateUser.email = userData.email;
    updateUser.password = userData.password;
    updateUser.contact_number = userData.contact;
    await updateUser.save();
    // let updateAddress = await updateUser.addresses().fetch()
    // let updateAddressJ = updateAddress.toJSON()
    // updateAddress[0].building_name = userData.building_name;
    // updateAddress[0].street_name = userData.street_name;
    // updateAddress[0].unit_number = userData.unit_number;
    // updateAddress[0].postal_code = userData.postal_code;
    // updateAddress[0].country = userData.country;
    // await updateAddress.save();
    // await updateUser.addresses().attach(updateAddress.id)
    response.route('show_all_users');
  }

  async delete({params}){
    let user = await Users.find(params.id);
    return render.view('users/usersdelete',{
      'user': user.toJSON()
    })
  }

  async processDelete({ })
}

module.exports = UserController
