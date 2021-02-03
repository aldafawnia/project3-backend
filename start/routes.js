'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

// Users
Route.get('/users_api', 'UserController.api')
Route.get('/users', 'UserController.index').as('show_all_users')
Route.get('/users/create', 'UserController.create')
Route.post('/users/create', 'UserController.processCreate').as('create_users')
Route.get('/users/:id/update', 'UserController.update')
Route.post('/users/:id/update', 'UserController.processUpdate').as('update_user')
Route.get('/users/:id/delete', 'UserController.delete').as('delete_user')

// Addresses
Route.get('/users/:id/add_address', 'AddressController.create')
Route.post('/users/:id/add_address', 'AddressController.processCreate').as('add_addresses')
Route.get('/users/:id/edit_address', 'AddressController.update')
Route.post('/users/:id/edit_address', 'AddressController.processUpdate').as('edit_address')
Route.get('/users/:id/delete_address', 'AddressController.delete').as('delete_address')

// Products
Route.get('/products_api', 'ProductController.api')
Route.get('/products', 'ProductController.index').as('show_all_products')
Route.get('/products/admin', 'ProductController.adminIndex')
