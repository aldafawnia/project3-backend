'use strict'

const Admin = use('App/Models/Admin')

class AdminController {

  register({view}){
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

  login({view}){
    return view.render('adminlogin')
  }

  async processLogin({auth, request}){
    let formData = request.post();
    await auth.attempt(formData.username, formData.password);
    return "Login Success"
  }

}

module.exports = AdminController
