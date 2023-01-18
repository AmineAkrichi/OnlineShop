const mongoose = require('mongoose')

const schema = mongoose.Schema

const productSchema = new schema({
    code: String,
    name: String,
    description: String,
    category: String,
    price: Number,
    imageUrl: String
})

module.exports=mongoose.model('product', productSchema , 'Products')