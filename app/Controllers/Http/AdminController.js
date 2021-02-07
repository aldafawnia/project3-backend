'use strict'

class AdminController {
  register({view}){
    return view.render('adminregister')
  }
}

module.exports = AdminController
