import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-report',
  standalone:false,
  templateUrl: './report.html',
  styleUrl: './report.scss'
})
export class Report implements OnInit {
  orders: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log('Fetching orders via GET /api/orders');
    this.http.get('http://13.201.120.0:3000/api/orders').subscribe({
      next: (resp: any) => {
        console.log('Orders received:', resp.data);
        this.orders = resp.data.map((order: any) => ({
          ...order,
          total_amount: parseFloat(order.total_amount).toFixed(2),
          items: order.items.map((item: any) => ({
            ...item,
            unitPrice: parseFloat(item.unitPrice).toFixed(2),
            totalPrice: parseFloat(item.totalPrice).toFixed(2)
          })),
          order_date: new Date(order.order_date).toLocaleString()
        }));
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
        alert(`Failed to fetch orders: ${err.error?.error || 'Unknown error'}`);
      }
    });
  }
}