'use strict'

const Admin = use('App/Models/Admin')

class AdminController {
  async register({view}){
    return view.render('adminregister')
  }

  async processRegister({request,response}){
    let formData = request.post()
    let newAdmin = new Admin()
    newAdmin.username = formData.username
    newAdmin.password = formData.password
    await newAdmin.save()
    response.json(newAdmin)
  }
}

module.exports = AdminController
