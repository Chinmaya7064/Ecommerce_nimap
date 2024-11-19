# Product Management System

## Node.js MySQL Project

This is a Node.js project using Express.js and MySQL as the database.

## Features
- Add, Edit, Delete Products and categories.
- Pagination of products.

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/Chinmaya7064/Ecommerce_nimap.git
2. Install dependencies
   ```bash
   npm install
3. Create a .env file for database configuration
   ```bash
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=password
   DB_NAME=database_name
   PORT=8000
4. Start the application on your terminal
   ```bash
   node app.js

## Endpoints to Test
1. Home Page
 - Endpoint: GET /
 - Description: Displays the list of all products.
2. Admin Products Page
 - Endpoint: GET /products
 - Description: Displays the admin product list with options to edit and delete.
3. Add Product
 - Endpoint: GET /products/add
  - Description: Displays the form to add a new product.
 - Endpoint: POST /products/add
  - Description: Submits the form to add a new product.
4. Edit Product
 - Endpoint: GET /products/edit/:productId
  - Description: Displays the form to edit an existing product.
 - Endpoint: POST /products/edit
  - Description: Submits the form to update the product.
5. Delete Product
 - Endpoint: POST /products/delete
 - Description: Deletes a product by its ID.
6. Categories List
 - Endpoint: GET /categories
 - Description: Displays the list of all categories with options to edit and delete.
7. Add Category
 - Endpoint: GET /categories/add
  - Description: Displays the form to add a new category.
 - Endpoint: POST /categories/add
  - Description: Submits the form to add a new category.
8. Edit Category
 - Endpoint: GET /categories/edit/:categoryId
  - Description: Displays the form to edit a category.
 - Endpoint: POST /categories/edit
  -  Description: Submits the form to update the category.
9. Delete Category
 - Endpoint: POST /categories/delete
 - Description: Deletes a category by its ID.
