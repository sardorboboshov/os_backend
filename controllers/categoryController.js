const Category = require('../models/categoryModel')

exports.createCategory = async (req, res) => {
  try {
    const title = req.body.title;
    if (!title) res.status(400).json({
      status: 'Failed',
      message: 'Category already exists'
    })
    const category = await Category.create({ title: title })
    res.status(201).json({
      status: "success",
      data: {
        category
      }
    })
  } catch (err) {
    res.json({
      status: 'Failed',
      message: err.message
    })
  }
}

exports.getCategory = async (req, res) => {
  const category = await Category.findOne({
    title: req.params.title
  })
  if (!category) {
    res.status(404).json({
      status: 'Failed',
      message: 'Not Found'
    })
  } else {
    res.status(201).json({
      status: "success",
      category
    })
  }
}

exports.getCategories = async (req, res) => {
  const categories = await Category.find({}, { _id: 0, title: 1, urlTitle: 1 })
  res.status(201).json({
    status: "success",
    length: categories.length,
    categories
  })
}