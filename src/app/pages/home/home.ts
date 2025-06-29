import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {  
  navigationItems = [
    { name: 'Billing', route: '/billing', icon: 'bi bi-receipt' },
    { name: 'Inventory', route: '/inventory', icon: 'bi bi-box-seam' },
    { name: 'Add Items', route: '/add-items', icon: 'bi bi-plus-circle' },
    { name: 'Report', route: '/report', icon: 'bi bi-file-earmark-text' },
  ];
}
