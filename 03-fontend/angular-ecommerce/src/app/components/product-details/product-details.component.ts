import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent  implements OnInit {

  product!: Product;
products: any;

  constructor(private productService: ProductService,
    private cartService:CartService,
    private route: ActivatedRoute){}

    ngOnInit(): void{
      this.route.paramMap.subscribe(()=> {
        this.handleProductDetails();
      })
    }
  handleProductDetails() {
   const theProductId: number =+ this.route.snapshot.paramMap.get('id')!;

   this.productService.getProduct(theProductId).subscribe(
    data => {
      this.product =data;
    }
   )
  }
addToCart(){
console.log('Adding to cart: ${this.product.name}, ${this.product.unitPrice')
const theCartItem = new CartItem(this.product);
this.cartService.addToCart(theCartItem);

}
}
