var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
  ProductName: String,
  AddedOn: Date,
  ProductPrice: Number,
  ProductServing: Number,
  ProductDescription: String,
  ProductImages: Array,
  Likes:Number,
  Stock:Number
});

module.exports =  mongoose.model('Product', productSchema);
