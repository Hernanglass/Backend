import { CartModel } from '../models/carts.js';

export const getCartByIdService =async (cid) =>{
    try {
        return await CartModel.findById(cid).populate('products.id');

    } catch (error) {
        console.log('getCartById -> ', error);
        throw error;
    }
}


export const createCartService =async () =>{
    try {
        return await CartModel.create({});
        
    } catch (error) {
        console.log('createCartService -> ', error);
        throw error;
    }
}


export const addProductInCartService =async (cid, pid) =>{
    try {
        const carrito = await CartModel.findById(cid);

        if (!carrito)
            return null;

       const productoInCart = carrito.products.find(p=>p.id.toString() === pid );

       if(productoInCart)
        productoInCart.quantity ++;
       else 
            carrito.products.push({id:pid, quantity: 1 });

        carrito.save();
        return carrito;
    } catch (error) {
        console.log('addProductInCartService -> ', error);
        throw error;
    }
}

export const deleteProductsInCartService =async (cid, pid) => {
    try {
       return await CartModel.findByIdAndUpdate(cid, {$pull:{'products':{id:pid}}}, {new:true});
    } catch (error) {
        console.log('DeleteProductInCartService -> ', error);
        throw error;
    }
}


export const updateProductsInCartService =async (cid, pid, quantity) => {
    try {
       return await CartModel.findOneAndUpdate(
        { _id:cid, 'products.id':pid },
        { $set: {'products.$.quantity':quantity} },
        { new: true}
       );
    } catch (error) {
        console.log('UpdateProductInCartService -> ', error);
        throw error;
    }
}


export const deleteCartService =async (cid) => {
    try {
       return await CartModel.findByIdAndUpdate(cid, {$set:{'products': [] }}, {new:true});
    } catch (error) {
        console.log('DeleteProductInCartService -> ', error);
        throw error;
    }
}