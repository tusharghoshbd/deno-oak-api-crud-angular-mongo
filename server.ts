import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { products } from './db/db-connect.ts';

// const product = await products.findOne({ _id: {"$oid": "5edccc1f1a0e1037029f7684" }  });
// console.log(product);

const books=new Map<string, any>();
books.set("1", {
    id: "1",
    title: "The Hound of the Baskervilles",
    author: "Conan Doyle, Arthur",
});

const router=new Router();
router
    .get("/", (context) => {
        context.response.body="Hello world!";
    })
    .get("/book", (context) => {
        context.response.body=Array.from(books.values());
    })
    .get("/book/:id", (context) => {
        if (context.params&&context.params.id&&books.has(context.params.id)) {
            context.response.body=books.get(context.params.id);
        }
    });

const app=new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });