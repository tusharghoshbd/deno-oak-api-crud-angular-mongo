import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from './app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title='CRUD operation using Deno api and Angular';
    sub: Subscription;
    products: any=[];
    product: any={ id: 0, name: "", price: "", color: "", size:"" };
    editFlag=false;
    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.getProducts();
    }
    onAddProductSubmit() {
        if (this.editFlag==false) {
            this.sub=this.productService.addProduct(this.product).subscribe((data: any) => {
                if (data.success == true) {
                    this.getProducts();
                    this.resetForm();
                }
                else {
                    console.log("Failed");
                }
            });
        }
        else {
            this.sub=this.productService.updateProduct(this.product).subscribe((data: any) => {
                if (data.success) {
                    this.getProducts();
                    this.resetForm();
                }
                else {
                    console.log("Failed");
                }
            });
        }

    }

    onEditProduct(id: any, pProduct: any) {
        // let tempProduct = JSON.parse(JSON.stringify(pProduct));
        this.product=JSON.parse(JSON.stringify(pProduct))
        this.editFlag=true;
    }

    onDeleteProduct(pId: number) {
        this.sub=this.productService.deleteProduct(pId).subscribe((data: any) => {
            if (data.success) {
                this.getProducts();
            }
            else {
                console.log("Failed");
            }
        });
    }

    resetForm() {
        this.product={ id: 0, name: "", price: "", color: "", size:"" };
        this.editFlag=false;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    private getProducts() {
        this.sub=this.productService.getAllProducts().subscribe((data: any) => {
            this.products=data.data;
        });

    }
}
