const Category = require("../../models/CategoryModel")
const Product = require("../../models/ProductModel")

exports.getAddProductPage = (req, res) => {
    Category.findAll({attributes: ['id', 'title']})
        .then((categories) => {
            const viewsData = {
                edit: false,
                categories,
                pageTitle: 'Add Product'
            }
            res.render('AddProduct', viewsData)
        })
        .catch((error) => {
            console.log(error)
        })
}


exports.postAddProductPage = (req, res) => {
    const categoryId = req.body.categoryId
    const product = {
        title: req.body.title,
        price: req.body.price,
        categoryId : req.body.categoryId
    }

    let categoryObj;

    Category.findByPk(categoryId)
        .then((category) => {
            categoryObj = category;
            return Product.create(product)
        })
        .then((productObj) => {
            return productObj.setCategory(categoryObj)
        })
        .then(() => {
            res.redirect('/')
        })
        .catch((error) => {
            console.log(error)
        })
}


exports.getAdminProductsPage = (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = 5; 
    const offset = (page - 1) * limit;

    Product.findAndCountAll({
        include: Category,
        limit: limit,
        offset: offset,
    })
        .then((result) => {
            const totalPages = Math.ceil(result.count / limit);
            const viewsData = {
                admin: true,
                products: result.rows,
                currentPage: page,
                totalPages: totalPages,
                pageTitle: 'Admin Products',
            };
            res.render('product-list', viewsData);
        })
        .catch((error) => {
            console.log(error);
        });
};



exports.getEditProductPage = (req, res) => {
    const productId = req.params.productId

    let viewsData = {
        edit: true,
        pageTitle: 'Edit product'
    }

    Product.findByPk(productId) 
        .then((product) => {
            viewsData = { ...{product}, ...viewsData }
            return Category.findAll({ attributes: ['id', 'title'] })
        })
        .then((categories) => {
            viewsData = { ...{categories}, ...viewsData }
            res.render('AddProduct', viewsData)
        }) 
        .catch((error) => {
            console.log(error)
        })   
}

exports.postEditProductPage = (req, res) => {
    const productId = req.body.productId

    Product.findByPk(productId)
        .then((product) => {
            product.title = req.body.title;
            product.price = req.body.price;
            product.categoryId = req.body.categoryId;
            return product.save()
        })
        .then(() => {
            res.redirect('/products') 
        })
        .catch((error) => {
            console.log(error)
        })
}

exports.postDeleteProductPage = (req, res) => {
    const productId = req.body.productId
    Product.findByPk(productId)
        .then((product) => {
            return product.destroy();
        })
        .then(() => {
            res.redirect('/products')
        })
        .catch((error) => {
            console.log(error)
        })
}