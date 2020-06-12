import { products } from '../db/db-connect.ts';

// const product = await products.findOne({ _id: {"$oid": "5edccc1f1a0e1037029f7684" }  });
export const allProducts=async (context: any) => {
    try {
        let data=await products.find({});
        context.response.body={ data: data };
        context.response.status=200;
    }
    catch (error) {
        context.response.body={ error, data: [] };
        context.response.status=400
    }
}
export const productById=async (context: any) => {
    try {
        const id :string = context.params.id;
        let data=await products.findOne({ _id: { "$oid": id } });
        context.response.body={ data: data };
        context.response.status=200;
    }
    catch (error) {
        context.response.body={ error, data: {} };
        context.response.status=400
    }
}
export const addProduct=async (context: any) => {
    try {
        let body: any = await context.request.body();
        const id = await products.insertOne(body.value);    
        context.response.body={ id: id };
        context.response.status=200;
    }
    catch (error) {
        context.response.body={ error, id: "" };
        context.response.status=400
    }
}
export const updateProduct=async (context: any) => {
    try {
        const id :string = context.params.id;
        let body: any=await context.request.body();
        const data=await products.updateOne({ _id: { "$oid": id } }, { $set: body.value });   
        context.response.body={ data: data };
        context.response.status=200;
    }
    catch (error) {
        context.response.body={ error, data: "" };
        context.response.status=400
    }
}
export const deleteProduct=async (context: any) => {
    try {
        const id :string = context.params.id;
        const data = await products.deleteOne({_id: {"$oid": id}});  
        context.response.body={ data: data };
        context.response.status=200;
    }
    catch (error) {
        context.response.body={ error, data: "" };
        context.response.status=400
    }
}
