'use strict'

const Products = use('App/Models/Product')
const Categories = use('App/Models/Category')

class ProductController {
  async api({response,params}){
    // let products = await Products.all()
    let products = await Products.query().with('categories').fetch()
    response.json(products)
  }

  async index({view}){
    let products = await Products.query().with('categories').fetch()
    return view.render('products/viewproduct', {
      'products': products.toJSON(),
    })
  }

  async adminIndex({view}){
    let products = await Products.query().with('categories').fetch()
    return view.render('products/productdata', {
      'products': products.toJSON(),
    })
  }

  async create({view}){
    return view.render('products/adminaddproduct')
  }

}

module.exports = ProductController
