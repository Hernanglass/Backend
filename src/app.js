import express from "express";
import {Server} from 'socket.io';
import { engine } from "express-handlebars";

import products from './routers/products.js';
import carts from './routers/carts.js';
import views from './routers/views.js';
import __dirname from "./utils.js";

import { dbConnection } from "./database/config.js";
import { productModel } from "./models/products.js";
import { MessageModel } from "./models/messages.js";






const app = express();
const PORT = 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');


app.use('/api/products', products);
app.use('/api/carts', carts);
app.use('/', views);


await dbConnection();

const expressServer = app.listen(PORT, ()=>{
    console.log(`corriendo aplicacion en el puerto ${PORT}`);
});

const io = new Server(expressServer);

io.on('connection', async(socket) =>{

    //Productos
    const productos= await productModel.find();
    socket.emit('productos', productos);

    socket.on('agregarProducto', async (producto)=>{
        const newProduct = await productModel.create({...producto});
        if(newProduct){
            productos.push(newProduct)
        }
        socket.emit('productos', productos);
    });

    //Chat messages
    const messages = await MessageModel.find();
    socket.emit('message', messages);

    socket.on('message', async (data) =>{
        const newMessage = await MessageModel.create({...data});
        if (newMessage){
            const messages = await MessageModel.find();
            io.emit('messageLog', messages)
        }
    })
    socket.broadcast.emit('nuevo_user')
});

 
