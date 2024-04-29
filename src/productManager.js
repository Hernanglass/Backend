// const fs = require('fs');
import fs from 'fs'

class ProductManager{
    #products;
    path;
    static idProducto = 0;

    constructor() {
        this.path = "./src/data/productos.json";
        this.#products = this.leerProductosInFile();
        
    }

    asignarIdProducto(){
        let id = 1;
        if(this.#products.length != 0)
        id = this.#products[this.#products.length-1].id +1;
    return id;
    }


    guardarArchivo(){
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.#products));
        } catch (error) {
            console.log(`ocurrio un error al momento de guardar el archivo`)
        }
    }

    leerProductosInFile(){
        try {
            if(fs.existsSync(this.path)){
                return JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            }

            return []
        } catch (error) {
            console.log(`ocurrio un error al momento de leer el archivo`)
        }
    }
    
    
    addProduct(title, description, price, thumbnails=[], code, stock, category, status = true){
        
        let result = 'Ocurrio un error';

        if(!title || !description || !price || !thumbnails || !code || !stock || !category)
            result = `todos los parametros son requeridos [title, description, price, code, stock, category,]`;
        else{
            const codeRepetido = this.#products.some(p => p.code ==code);
        if (codeRepetido)
            result = `el codigo ${code} ya se encuentra registrado en otro producto`;
        else{
            ProductManager.idProducto = ProductManager.idProducto + 1
            const id = this.asignarIdProducto();
        
        const nuevoProducto = {
            id,
            title,
            description, 
            price,
            thumbnails,   
            code, 
            stock,
            category,
            status
        };
        
        this.#products.push(nuevoProducto);
        this.guardarArchivo();
        result = {
            msg: 'producto agregado exitosamente!',
            producto: nuevoProducto
        };
        }
        
        }
        
        return result;
    }

    getProducts(limit = 0 ){
        limit = Number(limit);
        if (limit > 0)
            return this.#products.slicew (0, limit)
        return this.#products;
    }

    getProductsById(id){
        let status = false;
        let resp = `producto con ${id} no existe`;

        const producto = this.#products.find(p => p.id ==id);

        if(producto){
            status = true;
            resp= producto

            return { status, resp }
        }
    
    
        
    }

    updateProduct(id, objetUpdate){
        let result = `el producto con ${id} no existe`;

        const index = this.#products.findIndex(p=> p.id === id);

        if(index !== -1){
            const {id, ...rest} = objetUpdate;
            const propiedadesPermitidas = ['title, description, price, thumbnails, code, stock, category, status'];
            const propiedadesActualizadas = Object.keys(rest)
            .filter(propiedad => propiedadesPermitidas.includes(propiedad))
            .reduce((obj, key) => {
                obj[key] = rest[key];
                return obj;
            }, {});
            this.#products[index] = {...this.#products[index], ...propiedadesActualizadas};
            this.guardarArchivo();
            msg = `Producto actualizado`;
        }
        
        return msg;
    }

    deleteProduct(id){
        let msg = `el producto con ${id} no existe`;
        const index = this.#products.findIndex( p => p.id === id);
        if(index !== -1){
            this.#products = this.#products.filter(p=> p.id !== id);
            this.guardarArchivo();
            msg = `Producto eliminado`
        }
        return msg;
    }
};



// module.exports = ProductManager;

export default ProductManager;