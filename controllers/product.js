const Product = require("../model/products");

exports.getAllProducts = async(req,res)=>{
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } 
    catch (error){
        res.status(500).json({ message: error.message });
    }
}

exports.addProduct = async(req,res)=>{
     try {
        const {title,price,image} = req.body;

        await Product.create({
            title,price,image
          })

        
        res.status(200).json({message:"Product added successfully"})
   
     }
     catch (error) {
        res.status(400).json({ message: error.message });
     }
}
