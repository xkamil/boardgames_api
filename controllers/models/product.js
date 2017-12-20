let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ProductSchema = new Schema(
    {
        name: String,
        price: Number,
        quantity: Number
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('Product', ProductSchema);