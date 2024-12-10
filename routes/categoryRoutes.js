const express = require('express');
const { getCategoryPage, getAddCategoryPage, postAddCategoryPage, getEditCategoryPage, postEditCategoryPage, postDeleteCategoryPage } = require('../controllers/admin/CategoryController');

const router = express.Router();

router.get('/', getCategoryPage);
router.get('/add', getAddCategoryPage);
router.post('/add', postAddCategoryPage);
router.get('/edit/:categoryId', getEditCategoryPage);
router.post('/edit', postEditCategoryPage);
router.post('/delete', postDeleteCategoryPage);

module.exports = router;