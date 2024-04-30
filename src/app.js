import express from "express";
import {Server} from 'socket.io';
import { engine } from "express-handlebars";

import products from './routers/products.js';
import carts from './routers/carts.js';
import views from './routers/views.js';
import __dirname from "./utils.js";
import ProductManager from "./productManager.js";




const app = express();
const PORT = 8080;

const p = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');




app.use('/api/products', products);
app.use('/api/carts', carts);
app.use('/', views);

const expressServer = app.listen(PORT, ()=>{
    console.log(`corriendo aplicacion en el puerto ${PORT}`);
});

const socketServer = new Server(expressServer);

socketServer.on('connection', socket =>{
    console.log('cliente conectado desde el front');
    const productos = p.getProducts();
    socket.emit('productos', productos);

});

 
