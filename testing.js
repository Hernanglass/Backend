// const ProductManager = require("./productManager");
import ProductManager from "./src/productManager.js";



const producto = new ProductManager();

console.log(producto.addProduct(`laptop`, ` lenovo 29`, 6000, `httpoajmf.aa`, `s235gk`, 35));

// console.log(producto.getProducts());
// console.log(producto.getProductsById(1));



