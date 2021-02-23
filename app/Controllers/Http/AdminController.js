'use strict'

const { validateAll } = use('Validator')
const Admin = use('App/Models/Admin')
const Hash = use('Hash')

class AdminController {

  register({view}){
    return view.render('adminregister')
  }

  async processRegister({request,response, session}){
    const rules = {
    username: 'required|unique:admins',
    password: 'required|confirmed|min:8',
    }

    const messages = {
    'username.required': 'Please provide username',
    'username.unique': 'Username already exist',
    'password.required': 'Please provide password',
    'password.min': 'Password is less than 8 characters',
    'password.confirmed': 'Password does not match',
    }

    let formData = request.post();
    const validation = await validateAll(formData, rules, messages)
    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()
      return response.redirect('back')
    }
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
    let adminlogin = await Admin.findBy('username', formData.username)
    await Hash.verify('plain-value','hashed-value')
    if(!adminlogin){
      session
        .withErrors({username:'Invalid username'})
        .flashAll()
     return response.redirect('back')
    }
    else{
      let admin_login = adminlogin.toJSON()
      let verifyPassword = await Hash.verify(formData.password,admin_login.password)
      if(!verifyPassword){
        session
          .withErrors({password:'Incorrect password'})
          .flashAll()
        return response.redirect('back')
      }
      else{
        await auth.authenticator('admin').attempt(formData.username, formData.password)
        // await auth.attempt(formData.username, formData.password);
        session.flash({ notification: `You are now logged in to ${formData.username}` });
        response.route('admin_productlist')
      }
    }
  }

  async logout({auth, response}){
    await auth.logout()
    response.route('admin_login')
  }
}

module.exports = AdminController
