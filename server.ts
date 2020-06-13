import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { allProducts, addProduct, updateProduct, deleteProduct, productById } from "./controller/products.ts";

const router=new Router();
router
    .get("/products", allProducts)
    .get("/product/:id", productById)
    .post("/product", addProduct)
    .put("/product/:id", updateProduct)
    .delete("/product/:id", deleteProduct);

const app=new Application();
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());
await app.listen({ port: 8000 });