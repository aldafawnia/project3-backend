'use strict'

const Admin = use('App/Models/Admin')

class AdminController {

  register({view}){
    return view.render('adminregister')
  }

  async processRegister({request,response, session}){
    let formData = request.post()
    let newAdmin = new Admin()
    newAdmin.username = formData.username
    newAdmin.password = formData.password
    session.flash({ notification: `${newAdmin.username} has been created` });
    await newAdmin.save()
    response.route('admin_login')
  }

  login({view}){
    return view.render('adminlogin')
  }

  async processLogin({auth,response,request,session}){
    let formData = request.post();
    await auth.authenticator('admin').attempt(formData.username, formData.password)
    // await auth.attempt(formData.username, formData.password);
    session.flash({ notification: `You are now logged in to ${formData.username}` });
    response.route('admin_productlist')
  }


}

module.exports = AdminController
