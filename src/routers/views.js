import {Router} from 'express';
import { getProductsService } from '../services/products.js';


const router = Router();

router.get('/', async(req, res)=>{
    const {payload} = await getProductsService({});

    return res.render('home', {productos: payload, styles: 'style.css', title: 'Home'});
});

router.get('/realtimeproducts', (req, res)=>{
    return res.render('realTimeProducts', {title: 'Real time'});
});

router.get('/chat', (req, res)=>{
    return res.render('chat', {styles: 'chat.css', title: 'Chat'});
});


router.get('/products', async(req,res) =>{
    const result = await getProductsService({...req.query})
    return res.render('products', {title: 'productos', result})
});

export default router;