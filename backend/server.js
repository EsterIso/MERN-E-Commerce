import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import cartRoutes from './routes/cart.route.js'
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Clerk middleware for authentication
app.use(ClerkExpressWithAuth());

app.use(express.json());//allow us to accept json data in the req.body

app.use('/api/products', productRoutes)

app.use('api/cart', cartRoutes)

console.log(process.env.MONGODB_URI)

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);

});