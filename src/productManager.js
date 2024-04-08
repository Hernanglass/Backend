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
        
        if(!title || !description || !price || !thumbnails || !code || !stock || !category)
            return `todos los parametros son requeridos [title, description, price, code, stock, category,]`
        
        
        const codeRepetido = this.#products.some(p => p.code ==code);
        if (codeRepetido)
            return `el codigo ${code} ya se encuentra registrado en otro producto`;
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
        this.guardarArchivo;
        return `producto agregado exitosamente!`;
    }

    getProducts(limit = 0 ){
        limit = Number(limit);
        if (limit > 0)
            return this.#products.slicew (0, limit)
        return this.#products;
    }

    getProductsById(id){
        const producto = this.#products.find(p => p.id ==id);
        if(producto)
            return producto;
        else
        return `Not found`
    }

    updateProduct(id){
        let msg = `el producto con ${id} no existe`;

        const index = this.#products.findIndex(p.id === id);

        if(index !== -1){
            const {id, ...rest} = objetUpdate
            this.#products[index] = {...this.#products[index], ...rest};
            this.guardarArchivo();
            msg = `Producto actualizado`
        }
    }

    deleteProduct(id){
        let msg = `el producto con ${id} no existe`;
        const index = this.#products.findIndex(p.id === id);
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