'use strict'

const Categories = use('App/Models/Category')
const Products = use('App/Models/Product')

class CategoryController {
  async index({view}){
    let categories = await Categories.all()
    // let categories = await Categories.query().with('products').fetch()
    return view.render('categories/categorylist',{
      'categories': categories.toJSON()
    })
  }

  async create({view}){
    return view.render('categories/addcategory')
  }


}

module.exports = CategoryController
