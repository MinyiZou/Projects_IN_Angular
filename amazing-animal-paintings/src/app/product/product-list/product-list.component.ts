import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from 'src/app/cart/cart.service';
import { Product, SortOptions } from 'src/app/models/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})


export class ProductListComponent implements OnInit {

  products: Product[] = []
  filterProducts: Product[] = []
  sortOption: SortOptions = SortOptions.None
  //  将枚举引用为组件的一个属性，以便在模板中使用
  SortOptions = SortOptions

  constructor(private productService: ProductService, private cartService: CartService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products
        this.filterProducts = products
      }
    )
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product).subscribe({
      next: () => {
        this.snackBar.open('Product added to cart', "", {
          duration: 2000,
          horizontalPosition: "center",
          verticalPosition: "top"
        })
      }
    })
  }

  applyFilter(event: Event): void {
    let searchTerm = (event.target as HTMLInputElement).value.toLowerCase()
    this.filterProducts = this.products.filter(product => product.name.toLowerCase().includes(searchTerm))
    
  }

  sortProducts(order: string): void {
    console.log(order)
    if (order === SortOptions.HighToLow) {
      this.filterProducts = this.filterProducts.sort((a, b) =>  b.price - a.price )
      this.sortOption = SortOptions.HighToLow
    } else if (order === SortOptions.LowToHigh){
      this.filterProducts = this.filterProducts.sort((a, b) =>  a.price - b.price )
      this.sortOption = SortOptions.LowToHigh
    }
  }

}
