const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const rootDir = require('./utils/path')

const adminRoutes = require('./routes/admin')
const homeRoutes = require('./routes/home')
const categoryRoutes = require('./routes/categoryRoutes')
const sequelize = require('./utils/database')
const Product = require('./models/ProductModel')
const Category = require('./models/CategoryModel')


app.set('view engine', 'ejs')
app.set('views', 'views')


//static files
app.use(express.static(path.join(rootDir, 'public')))
app.use('/css', express.static(path.join(rootDir, 'node_modules', 'bootstrap', 'dist', 'css')))
app.use(bodyParser.urlencoded({ extended: false }))

//routes
app.use(homeRoutes)
app.use( '/products' ,adminRoutes)
app.use( '/categories' ,categoryRoutes)
app.use((req, res) => {
    res.status(404).send('<h1>Page not found</h1>')
})

//DB relation
Category.hasMany(Product)
Product.belongsTo(Category)

//Database connection
Product
    .sync()
    .then((result) => {
        console.log(result)
    })
    .catch((error) =>{
        console.log(error)
    })

Category
    .sync()
    .then((result) => {
        console.log(result)
    })
    .catch((error) =>{
        console.log(error)
    })


//server connection
const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});