import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CartStore } from '../services/cart.store';

@Component({
  selector: 'app-billing',
  standalone: false,
  templateUrl: './billing.html',
  styleUrls: ['./billing.scss']
})
export class Billing implements OnInit {
  categories = [
    { name: 'Vegetables', icon: 'bi bi-apple' },
    { name: 'Fruits', icon: 'bi bi-apple' },
    { name: 'Beverages', icon: 'bi bi-cup-straw' },
    { name: 'Cold Drinks', icon: 'bi bi-cup' }
  ];
  itemsList: any[] = [];
  cartData: any = { cart: [], cart_id: null };
  cartDetails = { totalQty: 0, totalItems: 0, totalAmount: 0 };

  constructor(
    private http: HttpClient,
    private router: Router,
    private cartStore: CartStore
  ) {}

  ngOnInit() {
    this.cartStore.getCart().subscribe((data: any) => {
      this.cartData = data;
      this.getCartDetails();
    });
    this.filterItems('Vegetables'); // Default category
  }

  filterItems(category: string) {
    console.log('Filtering items for category:', category);
    this.http.get(`http://13.201.120.0:3000/api/items?category=${category}`).subscribe({
      next: (resp: any) => {
        this.itemsList = resp.data.map((item: any) => ({
          name: item.item_name,
          skuCode: item.skuCode || 'N/A',
          hsnCode: item.hsnCode || 'N/A',
          image: item.image || '',
          price: item.price,
          item_id: item.item_id,
          uom: item.uom || 'pcs'
        }));
        console.log('Items fetched:', this.itemsList);
      },
      error: (err) => {
        console.error('Error fetching items:', err);
      }
    });
  }

  addToCart(item: any) {
    console.log('Adding to cart:', item);
    const existingItem = this.cartData.cart.find((cartItem: any) => cartItem.item_id === item.item_id);
    if (existingItem) {
      // Update quantity and totalPrice for existing item
      this.cartStore.updateCartItem(existingItem.item_id, existingItem.quantity + 1);
    } else {
      // Add new item
      const cartItem = {
        name: item.name,
        quantity: 1,
        unitPrice: parseFloat(item.price).toFixed(2),
        totalPrice: parseFloat(item.price).toFixed(2),
        item_id: item.item_id,
        uom: item.uom
      };
      this.cartStore.addToCart(cartItem);
    }
    this.getCartDetails();
  }

  updateQuantity(index: number, quantity: number) {
    if (quantity < 1) {
      this.deleteCartItem(index);
      return;
    }
    const item = this.cartData.cart[index];
    this.cartStore.updateCartItem(item.item_id, quantity);
    this.getCartDetails();
  }

  deleteCartItem(index: number) {
    this.cartStore.deleteFromCart(index);
    this.getCartDetails();
  }

  deleteAllCartItem() {
    this.cartStore.clearCart();
    this.getCartDetails();
  }

  getCartDetails() {
    this.cartDetails.totalQty = this.cartData?.cart.reduce(
      (sum: number, item: any) => sum + Number(item.quantity),
      0
    );
    this.cartDetails.totalItems = this.cartData?.cart.length || 0;
    this.cartDetails.totalAmount = this.cartData?.cart.reduce(
      (sum: number, item: any) => sum + Number(item.totalPrice),
      0
    );
  }

  goToPayment() {
    if (this.cartData?.cart?.length) {
      this.router.navigate(['/payment'], { state: { cart: this.cartData } });
    }
  }

  getImageUrl(image: string): string {
    return image ? `url(${image})` : 'url(/assets/images/image-not-found.png)';
  }
}