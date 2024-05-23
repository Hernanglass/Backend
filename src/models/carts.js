import {Schema, model}  from "mongoose";
 
const nameCollection = 'Cart';

const CartSchema = new Schema({
    products: [
        {
            id:{
                type:Schema.Types.ObjectId,
                ref:'Producto'
            },
            quantity:{
                type:Number,
                required: [true, 'la cantidad del producto es obligatoria']
            }
        }
        

    ]
});

export const CartModel = model(nameCollection, CartSchema);