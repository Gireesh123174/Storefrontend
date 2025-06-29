import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CartStore } from '../services/cart.store';

@Component({
  selector: 'app-payment',
  standalone: false,
  templateUrl: './payment.html',
  styleUrl: './payment.scss'
})
export class Payment {
 cartData: any = history.state.cart || { cart: [], cart_id: null };
  paymentMethods = [
    { name: 'UPI', icon: 'bi bi-qr-code' },
    { name: 'Card', icon: 'bi bi-credit-card' },
    { name: 'Cash', icon: 'bi bi-cash' }
  ];

  constructor(
    private http: HttpClient,
    private router: Router,
    private cartStore: CartStore
  ) {}

  processPayment(method: string) {
    const order = {
      cart_id: this.cartData.cart_id,
      items: this.cartData.cart,
      total_amount: this.cartData.cart.reduce((sum: number, item: any) => sum + Number(item.totalPrice), 0),
      payment_method: method,
      order_date: new Date().toISOString()
    };

    this.http.post('http://13.201.120.0:3000/api/orders', order).subscribe({
      next: () => {
        this.cartStore.clearCart();
        alert(`Payment via ${method} successful!`);
        this.router.navigate(['/home']);
      },
      error: (err:any) => {
        console.error('Error processing payment:', err);
        alert('Payment failed');
      }
    });
  }
}

