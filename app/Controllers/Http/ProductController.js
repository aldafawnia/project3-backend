'use strict'

const Products = use('App/Models/Product')
const Categories = use('App/Models/Category')
const Config = use('Config')

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
    let category = await Categories.all()
    return view.render('products/adminaddproduct', {
      'category': category.toJSON(),
      'cloudinaryName': Config.get('cloudinary.name'),
      'cloudinaryApiKey': Config.get('cloudinary.api_key'),
      'cloudinaryPreset': Config.get('cloudinary.preset'),
      'sign_url': '/cloudinary/sign'
    })
  }

}

module.exports = ProductController
