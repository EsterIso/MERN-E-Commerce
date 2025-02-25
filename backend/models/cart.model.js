import mongoose from "mongoose";

const cartSchema =  new mongoose.Schema({
    CustomerID:{
        type: String,
        required: true
    },
    items:[
        {
            productID: { type: String, required: true },
            quantity: { type: Number, required: true},
            price: { type: Number, required: true}
        }
    ],
    totalPrice: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true//createdAt, updatedAt
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;