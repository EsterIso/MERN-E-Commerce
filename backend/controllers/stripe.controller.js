// controllers/stripe.controller.js
import Stripe from 'stripe';
import Cart from '../models/cart.model.js';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
    try {
        const customerId = req.auth.userId;
        
        // Get the cart for the user
        const cart = await Cart.findOne({ CustomerID: customerId });
        
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'Cart is empty' 
            });
        }
        
        // Format line items for Stripe
        const lineItems = cart.items.map(item => {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: `Product ID: ${item.productID}`,
                    },
                    unit_amount: Math.round(item.price * 100), // Stripe uses cents
                },
                quantity: item.quantity,
            };
        });
        
        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/checkout/success`,
            cancel_url: `${process.env.CLIENT_URL}/checkout/cancel`,
            metadata: {
                customerId: customerId,
            },
        });
        
        res.status(200).json({ 
            success: true, 
            sessionId: session.id,
            url: session.url 
        });
        
    } catch (error) {
        console.error('Stripe checkout error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error creating checkout session',
            error: error.message 
        });
    }
};

// This webhook handles events after payment
export const handleStripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    
    try {
        event = stripe.webhooks.constructEvent(
            req.body, 
            sig, 
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return res.status(400).json({ success: false, message: `Webhook Error: ${err.message}` });
    }
    
    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const customerId = session.metadata.customerId;
        
        try {
            // Clear the user's cart after successful payment
            await Cart.findOneAndUpdate(
                { CustomerID: customerId },
                { items: [], totalPrice: 0 }
            );
            
            // For demo purposes, we're just clearing the cart
            
        } catch (error) {
            console.error('Error processing payment completion:', error);
            return res.status(500).json({ success: false, message: 'Error processing payment' });
        }
    }
    
    res.status(200).json({ received: true });
};