const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
     title:{
         type:String,
         required:true,
         trim:true
     },
     price:{
        type:Number,
        required:true,
        trim:true,
        min: 0
     },
     image:{
        type:String,
        required:true,  
     }
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
