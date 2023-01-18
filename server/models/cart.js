const mongoose = require('mongoose')
const schema = mongoose.Schema


const cartSchema = new schema({
    userId: String,
    Date: {type: Date , default: Date.now},
    products: [{productCode: String, quantity:Number}],
})

module.exports=mongoose.model('cart', cartSchema , 'Carts')