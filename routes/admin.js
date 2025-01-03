const express = require('express')
const router = express.Router()
const { getAddProductPage, postAddProductPage, getAdminProductsPage, getEditProductPage, postEditProductPage, postDeleteProductPage } = require('../controllers/admin/ProductController')

router.get("/", getAdminProductsPage)

router.get("/add", getAddProductPage)

router.post("/add", postAddProductPage)

router.get("/edit/:productId", getEditProductPage)

router.post("/edit", postEditProductPage)

router.post("/delete", postDeleteProductPage)


module.exports = router