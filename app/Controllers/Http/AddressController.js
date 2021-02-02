'use strict'

const Addresses = use('App/Models/Address')
const Users = use('App/Models/User')

class AddressController {
  async create({view}){
    return view.render('addresses/createnewaddress')
  }

  async processCreate({request,response,params}){
    let user = await Users.find(params.id);
    let addressData = request.post();
    let newAddresses = new Addresses();
    newAddresses.building_name = addressData.building_name;
    newAddresses.street_name = addressData.street_name;
    newAddresses.unit_number = addressData.unit_number;
    newAddresses.postal_code = addressData.postal_code;
    newAddresses.country = addressData.country;
    await newAddresses.save()
    await user.addresses().attach(newAddresses.id)
    response.route('show_all_users');
  }

  async delete({params,response}){
    let address = await Addresses.find(params.id);
    await address.users().detach()
    await address.delete()
    response.route('show_all_users')
  }
}

module.exports = AddressController
