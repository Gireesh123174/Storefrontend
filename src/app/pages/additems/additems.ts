import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-additems',
  standalone:false,
  templateUrl: './additems.html',
  styleUrl: './additems.scss'
})
export class Additems {
  newItem = {
    item_name: '',
    item_type: 'Vegetables',
    skuCode: '',
    hsnCode: '',
    price: 0,
    stock_quantity: 0,
    uom: 'pcs'
  };
  excelData: any[] = [];
  categories = ['Vegetables', 'Fruits', 'Beverages', 'Cold Drinks'];
  uoms = ['pcs', 'kgs'];

  constructor(private http: HttpClient) {}

  addItem() {
    if (!this.newItem.item_name || this.newItem.price <= 0 || !this.categories.includes(this.newItem.item_type) || !this.uoms.includes(this.newItem.uom)) {
      alert('Please provide valid item name, price, category, and UOM.');
      return;
    }
    this.http.post('http://13.201.120.0:3000/api/items', this.newItem).subscribe({
      next: () => {
        alert('Item added successfully');
        this.newItem = { item_name: '', item_type: 'Vegetables', skuCode: '', hsnCode: '', price: 0, stock_quantity: 0, uom: 'kgs' };
      },
      error: (err) => {
        console.error('Error adding item:', err);
        alert(`Failed to add item: ${err.error?.error || 'Unknown error'}`);
      }
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) {
      alert('Please select a file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        this.excelData = XLSX.utils.sheet_to_json(sheet);
        // Validate data
        for (const item of this.excelData) {
          const category = item['Category'] || item['item_type'];
          const uom = item['UOM'] || item['uom'] || 'pcs';
          if (!category || !this.categories.includes(category)) {
            alert(`Invalid category in item ${item['Item Name'] || 'unknown'}. Must be one of: ${this.categories.join(', ')}`);
            this.excelData = [];
            return;
          }
          if (!this.uoms.includes(uom)) {
            alert(`Invalid UOM in item ${item['Item Name'] || 'unknown'}. Must be "pcs" or "kgs".`);
            this.excelData = [];
            return;
          }
        }
      } catch (error) {
        console.error('Error:', error);
        this.excelData = [];
      }
    };
    reader.readAsArrayBuffer(file);
  }

  uploadExcel() {
    if (this.excelData.length === 0) {
      alert('No data to upload.');
      return;
    }
    this.http.post('http://13.201.120.0:3000/api/items/bulk', this.excelData).subscribe({
      next: () => {
        alert('Items uploaded successfully');
        this.excelData = [];
      },
      error: (err) => {
        console.error('Error uploading items:', err);
        alert(`Failed to upload items: ${err.error?.error || 'Unknown error'}`);
      }
    });
  }

  downloadTemplate() {
    const link = document.createElement('a');
    link.href = 'assets/items_template.xlsx';
    link.download = 'items_template.xlsx';
    link.click();
  }
}