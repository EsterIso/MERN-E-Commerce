import express from 'express';
import { createCart, addToCart, getCart, removeItemFromCart, updateItemQuantity, clearCart } from '../controllers/cart.controller.js';

const router = express.Router();

router.post("/create", createCart);

router.get('/', getCart);

router.post('/items', addToCart);

router.delete('/items/:itemId', removeItemFromCart);

router.patch('/items/:itemId', updateItemQuantity);

router.delete('/', clearCart);

export default router;