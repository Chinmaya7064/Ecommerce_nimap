const fs = require('fs')
const path = require('path')
const rootDir = require('../utils/path')
const db = require('../utils/database')

getProductsFromFile = (callBack) => {
    const productsPath = path.join(rootDir, 'data', 'products.json')
    fs.readFile(productsPath, (error, productsData) => {
        if(error){
            return callBack([])
        }
        return callBack(JSON.parse(productsData))
    })
}

exports.saveProduct = (product) => {
    return db.execute(`INSERT INTO products (title, price) values (?, ?)`, [product.title, product.price])    
}

exports.fetchAllProducts = () => {
    return db.execute(`SELECT * FROM products`)
}

exports.getProductById = (productId, callBack) => {
    return db.execute(`SELECT * FROM products where id = ?`, [productId])
}

exports.updateProductById = (product, productId) => {
    const productsPath = path.join(rootDir, 'data', 'products.json')
    getProductsFromFile((products) => {
        const existingProductIndex = products.findIndex((prod) => prod.id.toString() === productId )

        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = product;
        fs.writeFile(productsPath, JSON.stringify(updatedProducts), (error) => {
            console.log(error)
        })
    })
}

exports.deleteProductById = (productId, callBack) => {
    const productsPath = path.join(rootDir, 'data', 'products.json')
    getProductsFromFile((products) => {
        let updatedProducts = products.filter((product) => product.id.toString() !== productId.toString() )
        fs.writeFile(productsPath, JSON.stringify(updatedProducts), (error) => {
            console.log(error)
        })
        callBack();
    })
}