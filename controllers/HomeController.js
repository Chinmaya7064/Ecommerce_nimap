const Category = require("../models/CategoryModel")
const Product = require("../models/ProductModel")

exports.getHomePage = (req, res) => {
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
                admin: false,
                products: result.rows,
                currentPage: page,
                totalPages: totalPages,
                pageTitle: 'Products List',
            };
            res.render('product-list', viewsData);
        })
        .catch((error) => {
            console.log(error);
        });
};


exports.getProductDetailsPage = (req, res) => {
    const productId = req.params.productId

    Product.findByPk(productId)
    .then((product) => {
        const viewsData = {
            product: product,
            pageTitle: product.title
        };
        res.render('ProductDetails', viewsData)
    })
    .catch((error) => {
        console.log(error)
    })
}