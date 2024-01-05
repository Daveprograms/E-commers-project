import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';

@Component({
  selector: 'app-product-category-menu',
  standalone: true,
  imports: [],
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css'
})
export class ProductCategoryMenuComponent implements OnInit {


  productCategories: ProductCategory
  constructor() {}


  ngOnInit() {
    
  }

}
