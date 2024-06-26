import {request, response} from 'express';
import { CartModel } from '../models/carts.js';
import { addProductInCartService, createCartService, deleteCartService, deleteProductsInCartService, getCartByIdService, updateProductsInCartService } from '../services/carts.js';

export const getCartById =async (req=request, res=response) =>{
    try {
        const {cid} = req.params;
        const carrito = await getCartByIdService(cid);
        
        if(carrito)
            return res.json({carrito});

        return res.status(404).json({msg: `el carrito con id ${cid} no existe `})
    } catch (error) {
        console.log('getCartById -> ', error);
        return res.status(500).json({msg: 'hablar con un administrador'});
    }
}


export const createCart =async (req=request, res=response) =>{
    try {
        const carrito = await createCartService();
        return res.json({msg:'carrito creado', carrito });
    } catch (error) {
        console.log('createCart -> ', error);
        return res.status(500).json({msg: 'hablar con un administrador'});
    }
}


export const addProductInCart =async (req=request, res=response) =>{
    try {
        const {cid, pid} = req.params;
        const carrito = await addProductInCartService(cid, pid);

        if (!carrito)
            return res.status(404).json({msg: `el carrito con id ${cid} no existe`});

        return res.json({msg: 'carrito actualizado', carrito });
    } catch (error) {
        return res.status(500).json({msg: 'hablar con un administrador'});
    }
}


export const deleteProductsInCart = async (req= request, res = response) => {
    try {
        const {cid, pid} = req.params;
        const carrito = await deleteProductsInCartService(cid, pid);
        if (!carrito)
            return res.status(404).json({msg:'No se pudo realizar la operacion'})
        return res.json({msg:'Producto eliminado del carrito', carrito})
    } catch (error) {
        return res.status(500).json({msg: 'hablar con un administrador'});
    }
}

export const updateProductsInCart = async (req= request, res = response) => {
    try {
        const {cid, pid} = req.params;
        const {quantity} = req.body;

        if(!quantity || !Number.isInteger(quantity))
            return res.status(404).json({msg:'La propiedad quantity es obligatoria y debe ser un numero entero'})

        const carrito = await updateProductsInCartService(cid, pid, quantity);

        if (!carrito)
            return res.status(404).json({msg:'No se pudo realizar la operacion'});
        return res.json({msg:'Producto actualizado en el carrito', carrito})
    } catch (error) {
        return res.status(500).json({msg: 'hablar con un administrador'});
    }
}


export const deleteCart= async (req= request, res = response) => {
    try {
        const {cid} = req.params;

        const carrito = await deleteCartService(cid);

        if (!carrito)
            return res.status(404).json({msg:'No se pudo realizar la operacion'});
        return res.json({msg:'Producto actualizado en el carrito', carrito})
    } catch (error) {
        return res.status(500).json({msg: 'hablar con un administrador'});
    }
}