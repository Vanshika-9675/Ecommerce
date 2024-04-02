const User = require("../model/User");
const Product = require("../model/products");

exports.addOrder = async (req, res) => {
    try {

        const { image, price , quantity,totalprice , productId } = req.body; 
        
        const userId = req.user.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        const existingProduct = await Product.findOne({ _id:productId});
        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        user.orders.push({ image, price ,quantity , totalprice , productId });
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Product added to orders',
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to add product to orders',
        });
    }
};


exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).populate('orders');

        if (!user) {
            console.log("User not found!");
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        return res.status(200).json({
            success: true,
            orders: user.orders,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Failed',
        });
    }
};
