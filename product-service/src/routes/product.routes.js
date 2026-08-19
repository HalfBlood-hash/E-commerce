import { Router } from "express";
import { createProduct, getProducts } from "../controllers/product.controllers.js";
import { roleBasedAuth } from "../middleware/roleBaseAuth.middleware.js";
const router = Router();

router.route("/")
    .get(getProducts)
    .post(roleBasedAuth,createProduct);

export default router;
