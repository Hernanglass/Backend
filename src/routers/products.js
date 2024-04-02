import {router} from 'express';
import ProductManager from '../productManager.js';

const router = Router();

router.get('/products', (req, res) =>{
    const {limit} = req.query;
    const p = new ProductManager();
    return res.json({productos: p.getProducts(limit) });
});


router.get('/:pid', (req, res) => {
    const {pid} = req.params;
    const p = new ProductManager();
    const producto = p.getProductsById(Number(pid));
    return res.json({producto});
});

router.post('/', (req, res)=>{
    return res.json({});
})

export default router;