const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Product = new Schema({
    id: Number,
    product: {
        productId: String,
        category: String,
        price: String,
        name: String,
        instock: String
    }
});

module.exports = mongoose.model('Product', Product);