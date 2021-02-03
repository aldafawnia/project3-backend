'use strict'

const Products = use('App/Models/Product')
const Categories = use('App/Models/Category')

class ProductController {
  async api({response,params}){
    // let products = await Products.all()
    let products = await Products.query().with('categories').fetch()
    response.json(products)
  }


}

module.exports = ProductController
