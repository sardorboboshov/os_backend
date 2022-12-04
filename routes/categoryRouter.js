const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')
const productController = require('../controllers/productController')

router.route('/').post(categoryController.createCategory).get(categoryController.getCategories)
router.route('/:categoryTitle').get(categoryController.getCategory)
router.route('/:categoryTitle/products').post(productController.createProduct)
router
  .route('/:categoryTitle/products/:productTitle')
  .get(productController.getProduct)
  .put(productController.changeProductQuantity)
module.exports = router;
