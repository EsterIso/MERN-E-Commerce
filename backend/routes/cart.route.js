import express from 'express';
import { createCart, addToCart, getCart, removeItemFromCart, updateItemQuantity } from '../controllers/cart.controller.js';

const router = express.Router();

router.post("/", createCart);

router.get('/', getCart);

router.post('/items', addToCart);

router.delete('/items/:id', removeItemFromCart);

router.put('/items/:id', updateItemQuantity);

export default router;