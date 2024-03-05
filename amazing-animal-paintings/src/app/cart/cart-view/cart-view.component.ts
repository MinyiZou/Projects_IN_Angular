import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {

  cartItems: Product[] = []
  totalPrice: number = 0

  constructor(private cartSerive: CartService) {}

  ngOnInit(): void {
    this.cartSerive.getCartItems().subscribe((items) => {
      this.cartItems = items;
      this.totalPrice = this.getTotalPrice()
    }) 
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((amount, item) => amount + item.price, 0)
  }

  clearCart(): void {
    this.cartSerive.clearCart().subscribe()
  }

  checkout(): void {
    this.cartSerive.checkout(this.cartItems).subscribe()
  }
}
