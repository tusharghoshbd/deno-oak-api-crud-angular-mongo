import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {
   
    baseUrl = "http://localhost:8000"; 
    constructor(public http: HttpClient) { }
    
    getAllProducts(){
        return this.http.get(this.baseUrl + '/products');
    }
    addProduct(product:any){
        let url = this.baseUrl + '/product';
        return this.http.post(url, product); 
    }
    updateProduct(product: any) {
        let url = this.baseUrl + '/product/'+ product._id.$oid;
        delete product["_id"];
        let body = product;
        return this.http.put(url, body);  
    }
    deleteProduct(id:any){
        let url = this.baseUrl + '/product/'+ id;
        return this.http.delete(url);  
    }

} 

