const Product = require('../models/productModel')
const Category = require('../models/categoryModel')

exports.createProduct = async (req, res) => {
  try {
    const category = await Category.findOne({
      urlTitle: req.params.categoryTitle
    })
    if(!category) throw new Error('No such category exists')
    const { title, quantity, isInWareHouse, price } = req.body;
    if (!(typeof price == 'number' && title)) throw new Error('Invalid Query')
    const newProduct = await Product.create({
      categoryTitle: req.params.categoryTitle,
      price: price ? price : 0,
      title: title,
      quantity: quantity ? quantity : 0,
      isInWareHouse: isInWareHouse ? true : false,
      expiresAt: req.body.expiresAt ? req.body.expiresAt : null,
      description: req.body.description ? req.body.description : ""
    })
    res.status(201).json({
      status: 'success',
      data: {
        newProduct
      }
    })
  } catch (err) {
    res.json({
      status: 'Failed',
      message:err.message
    })
  }
}

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      urlTitle: req.params.productTitle,
      categoryTitle: req.params.categoryTitle
    })
    if (!product) {
      return res.status(400).json({
        status: 'Failed',
        message: "Product not found",
      })
    }
    res.json({
      status: 'success',
      product
    })
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message
    })
  }
}

exports.changeProductQuantity = async (req, res) => {
  try {
    const productExists = await Product.findOne({
      urlTitle: req.params.productTitle,
      categoryTitle: req.params.categoryTitle
    })
    console.log(req.body, req.body.change);
    if (!productExists) throw new Error('No such product exists')
    if (typeof parseInt(req.body.change) === NaN) throw new Error('Specify number of changes')
    const { quantity } = productExists;
    const pr = await Product.updateOne({
      urlTitle: req.params.productTitle,
      categoryTitle: req.params.categoryTitle
    }, {
      quantity: quantity + parseInt(req.body.change)
    })
    res.json({
      status: 'success',
      product: pr
    })
  } catch (err) {
    res.json({
      status: 'Failed',
      message: err.message
    })
  }
}