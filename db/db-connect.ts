// importing the deno_mongo package from url
import { init, MongoClient } from "https://deno.land/x/mongo@v0.6.0/mod.ts";

// Intialize the plugin
await init()

const client=new MongoClient();
client.connectWithUri("mongodb://localhost:27017");
const db=client.database("deno-api");
const products=db.collection("products");
export { db, products };