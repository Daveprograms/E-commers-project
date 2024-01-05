import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  standalone: true,
  imports: [],
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css'
})
export class ProductCategoryMenuComponent implements OnInit {


  productCategories: ProductCategory []= [];
  constructor( private productservice: ProductService) {}


  ngOnInit() {
    this.listProductCategories();
    
  }
  listProductCategories() {
    this.productservice.getProductCategories().subscribe(
      (      data: ProductCategory[])=>{
        console.log('product Categories'+ JSON.stringify(data));
        this.productCategories = data;
      }
    );
  }

}
