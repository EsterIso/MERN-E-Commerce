import express from 'express';
import { createCart, addToCart, getCart, removeItemFromCart, updateItemQuantity } from '../controllers/cart.controller.js';

const router = express.Router();

router.post("/create", createCart);

router.get('/', getCart);

router.post('/items', addToCart);

router.delete('/items/:itemId', removeItemFromCart);

router.patch('/items/:itemId', updateItemQuantity);

export default router;