import {Schema, model}  from "mongoose";
 
const nameCollection = 'Producto';

const ProductoSchema = new Schema({

        title: {type: String, required:[true, 'el titulo del producto es obligatorio']},
        description: {type: String, required: [true, 'La descripcion del producto es obligatoria']},
        price: {type: Number, required: [ true, 'el precio del producto es obligatorio']},
        thumbnails: {type: String},
        code: {type: String, required: [ true, 'el codigo del producto es obligatorio'], unique: true},
        stock: {type: Number , required: [ true , 'el stock del producto es obligatorio']},
        category: {type: String, required: [ true, 'la categoria del producto es obligatoria']},
        status: [{type: Boolean , default: true}],
});

ProductoSchema.set('toJSON',{
        transform: function(doc, ret){
                delete ret.__v;
                return ret;
        }
});

export const productModel = model(nameCollection, ProductoSchema);
