import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inventory',
  standalone: false,
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss'
})
export class Inventory implements OnInit{
   items: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://13.201.120.0:3000/api/items').subscribe({
      next: (resp: any) => {
        this.items = resp.data;
      },
      error: (err) => {
        console.error('Error fetching inventory:', err);
      }
    });
  }
}
