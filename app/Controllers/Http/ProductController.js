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

    async processCreate({request,response}){
    let productData = request.post();
    console.log(productData.category)
    let newProduct = new Products();
    newProduct.product_name = productData.productname
    newProduct.price = productData.price*100
    newProduct.description = productData.description
    newProduct.image = productData.image
    newProduct.stock = productData.stock
    await newProduct.save()

    for(let c of productData.category){
      await newProduct.categories().attach(c)
    }

    response.route('admin_productlist')
  }

  async update({view,params}){
    let product = await Products.find(params.id);
    let productCategory = await product.categories().with('products').fetch()
    let categories = await Categories.all()
    let cArray = []
    for (let pc of productCategory.toJSON()) {
        cArray.push(pc.id)
    }
    return view.render('products/admineditproduct',{
      'product': product.toJSON(),
      'productCategory': productCategory.toJSON(),
      'categories': categories.toJSON(),
      'cArray' : cArray,
      'cloudinaryName': Config.get('cloudinary.name'),
      'cloudinaryApiKey': Config.get('cloudinary.api_key'),
      'cloudinaryPreset': Config.get('cloudinary.preset'),
      'sign_url': '/cloudinary/sign'
    })
  }

  async processUpdate({request,response,params,session}){
    let product = await Products.find(params.id);
    let productCategory = await product.categories().with('products').fetch()
    let productData = request.post()
    product.product_name = productData.productname
    product.price = productData.price*100
    product.description = productData.description
    product.image = productData.image
    product.stock = productData.stock
    await product.save();

    let cArray = []
    for (let pc of productCategory.toJSON()) {
      cArray.push(pc.id)
    }

    let newCategory = []
    for (let c of productData.category) {
      newCategory.push(parseInt(c))
    }

    for (let ca of cArray) {
      if (!newCategory.includes(parseInt(ca))) {
        await product.categories().detach(ca)
      }
    }

    for (let nc of newCategory) {
      if (newCategory.length !== 0) {
        if (!cArray.includes(parseInt(nc))) {
          await product.categories().attach(nc)
        }
      } else {
        await product.categories().attach(nc)
      }
    }

    return response.route('admin_productlist')
  }

}

module.exports = ProductController
