import express from "express";
import products from './routers/products.js'
import carts from './routers/carts.js'


const app = express();
const PORT = 8080;

app.use(express.json());

app.get('/', (req, res)=>{
    return res.send('solucion primer entrega')
})

app.use('/api/products', products);
app.use('/api/carts', carts);

app.listen(PORT, ()=>{
    console.log(`corriendo aplicacion en el puerto ${PORT}`);
});