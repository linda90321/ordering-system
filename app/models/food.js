/*
var mongoose = require('mongoose');

module.exports = mongoose.model('Food', {
    text: {
        type: String,
        default: ''
    }
});
*/
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
 
var FoodSchema = new Schema({
    name: String,
    price: String
});

 
module.exports = mongoose.model('Food', FoodSchema);
