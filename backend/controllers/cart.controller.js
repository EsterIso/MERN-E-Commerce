import mongoose from 'mongoose';
import Cart from '../models/cart.model.js'

export const createCart = async (req, res) => {

    try {
        const customerId = req.auth.userId;  // Get Clerk's user ID from the request

        if (!customerId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        // Check if the user already has a cart
        let cart = await Cart.findOne({ CustomerID: customerId });

        if (!cart) {
            // If no cart exists, create a new one
            cart = new Cart({
                CustomerID: customerId,
                items: [],
                totalPrice: 0
            });

            // Save the new cart in the database
            await cart.save();
        }

        // Return the cart details
        res.status(200).json({ message: 'Cart exists or was created', cart });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create or fetch cart', details: err.message });
    }
};

export const getCart = async(req, res) => {
    const customerId = req.auth.userId;

    try{
        const cart = await Cart.findOne({ CustomerID: customerId })

        if (!cart) {
            // If no cart exists, create a new one
            cart = new Cart({
                CustomerID: customerId,
                items: [],
                totalPrice: 0
            });

            // Save the new cart in the database
            await cart.save();
        }

        res.status(200).json({success: true, data: cart})
    } catch (error) {
        console.log("error in fetching cart", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
};

export const addToCart = async(req, res) => {
    const customerId = req.auth.userId; // Clerk User ID
    const { productId, quantity, price } = req.body;

    try {
        //find the cart for the user
        let cart = await Cart.findOne({ CustomerID: customerId });

        if (!cart) {
            //if no cart exist, create a new cart
            cart = new Cart({
                CustomerID: customerId,
                items: [],
                totalPrice: 0
            });
            await cart.save();
        }

        //Add the item to the cart
        const itemIndex = cart.items.findIndex(item => item.productID === productId);
        if (itemIndex === -1) {
            //item doesnt exist in cart, add it
            cart.items.push({ productID: productId, quantity, price });
        } else {
            //Item already exist, update quantity
            cart.items[itemIndex].quantity += quantity;
        }

        //Recalculate the total price
        cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);

        await cart.save();
        res.status(200).json({ message: 'Item added to cart', cart });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add item to cart', details: err.message });
    }
};

export const removeItemFromCart = async (req, res) => {
    const customerId = req.auth.userId;
    const { itemId } = req.params;

    try{
        const cart = await Cart.findOne({ CustomerID: customerId });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' })
        }
        cart.items = cart.items.filter(item => item._id.toString() !== itemId);
        cart.totalPrice = calculateTotalPrice(cart.items);

        await cart.save();
        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error removing item from cart', error: err.message});
    }
};

export const updateItemQuantity = async (req, res) => {
    const customerId = req.auth.userId;
    const { itemId } = req.params;
    const { quantity } = req.body;

    try{
        const cart = await Cart.findOne({ CustomerID: customerId });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' })
        }

        cart.items = cart.items.find(item => item._id.toString() === itemId);
        if(!item) {
            return res.status(404).json({ success: false, message: 'Item not found in cart' });
        }

        item.quantity = quantity;
        cart.totalPrice = calculateTotalPrice(cart.items);

        await cart.save();
        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating item quantity', error: err.message });
    }
};

export const clearCart = async (req, res) => {
    const customerId = req.auth.userId;

    try {
        const cart = await Cart.findOne({ CustomerID: customerId });
        
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }
        
        // Clear all items from the cart
        cart.items = [];
        cart.totalPrice = 0;
        
        await cart.save();
        
        res.status(200).json({ 
            success: true, 
            message: 'Cart cleared successfully', 
            data: cart 
        });
    } catch (error) {
        console.log("Error clearing cart:", error.message);
        res.status(500).json({ 
            success: false, 
            message: 'Error clearing cart', 
            error: error.message 
        });
    }
};