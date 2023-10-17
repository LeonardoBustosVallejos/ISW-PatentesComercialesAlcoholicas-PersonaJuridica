import { Router } from "express";

import { getProduct,
        createProduct,
        getProductById,
        updateProductById,
        deleteProductById} from "../controller/products.controller.js";

const router = Router();

router.get('/', getProduct);
router.post('/', createProduct);
router.get('/:productId', getProductById);
router.put('/:productId', updateProductById);
router.delete('/:productId', deleteProductById);

export default router;