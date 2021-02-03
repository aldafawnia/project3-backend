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

  async processCreate({request, response, params}){
    let data = request.post();
    let newCategory = new Categories();
    newCategory.category_name = data.categoryname;
    await newCategory.save()
    response.route('show_all_categories')
  }

  async update({view,params}){
    let category = await Categories.find(params.id);
    return view.render('categories/editcategory',{
      'category': category.toJSON()
    })
  }

  async processUpdate({request,response,params}){
    let editCategory = await Categories.find(params.id);
    let data = request.post();
    editCategory.category_name = data.categoryname;
    await editCategory.save()
    response.route('show_all_categories')
  }

}

module.exports = CategoryController
