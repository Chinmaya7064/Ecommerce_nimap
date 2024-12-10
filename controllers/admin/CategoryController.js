const Category = require('../../models/CategoryModel');

exports.getCategoryPage = (req, res) => {
    Category.findAll().then((categories) => {
        const viewsData = {
            pageTitle: 'Categories List',
            categories
        }
        res.render('admin/categories/categoriesPage', viewsData);
    })
}

exports.getAddCategoryPage = (req, res) => {
    const viewsData = {
        pageTitle: 'Add Category'
    }
    res.render('admin/categories/addCategoryPage', viewsData);
}

exports.postAddCategoryPage = (req, res) => {
    const title = req.body.title

    Category.create({title})
        .then(() => {
            res.redirect("/categories")
        })
        .catch((error) => {
            console.log(error)
        })
}

// Get Edit Category Page
exports.getEditCategoryPage = (req, res) => {
    const categoryId = req.params.categoryId;

    let viewsData = {
        edit: true,
        pageTitle: 'Edit Category',
    };

    Category.findAll()  // Fetch all categories to display in the table
        .then((categories) => {
            // Find the specific category to edit
            return Category.findByPk(categoryId)
                .then((category) => {
                    if (!category) {
                        return res.redirect('/categories');
                    }
                    viewsData = { ...viewsData, category, categories }; // Add both category and categories to viewsData
                    res.render('admin/categories/categoriesPage', viewsData);
                });
        })
        .catch((error) => {
            console.log(error);
        });
};

// Post Edit Category
exports.postEditCategoryPage = (req, res) => {
    const categoryId = req.body.categoryId;
    const updatedTitle = req.body.title;

    Category.findByPk(categoryId)
        .then((category) => {
            if (!category) {
                return res.redirect('/categories');
            }
            category.title = updatedTitle;
            return category.save();
        })
        .then(() => {
            res.redirect('/categories');
        })
        .catch((error) => {
            console.log(error);
        });
};

// Post Delete Category
exports.postDeleteCategoryPage = (req, res) => {
    const categoryId = req.body.categoryId;

    Category.findByPk(categoryId)
        .then((category) => {
            if (!category) {
                return res.redirect('/categories');
            }
            return category.destroy();
        })
        .then(() => {
            res.redirect('/categories');
        })
        .catch((error) => {
            console.log(error);
        });
};

