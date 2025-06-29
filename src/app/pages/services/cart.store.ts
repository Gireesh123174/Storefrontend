import { Injectable } from '@angular/core';
import { NgSimpleStateBaseRxjsStore, NgSimpleStateStoreConfig } from 'ng-simple-state';
import { Observable } from 'rxjs';

export interface CartState {
  cart: Array<{
    name: string;
    quantity: number;
    unitPrice: string;
    totalPrice: string;
    item_id: number;
    uom: string;
  }>;
  cart_id: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class CartStore extends NgSimpleStateBaseRxjsStore<CartState> {
  storeConfig(): NgSimpleStateStoreConfig {
    return {
      storeName: 'CartStore',
    };
  }

  initialState(): CartState {
    return {
      cart: [],
      cart_id: this.generateUniqueId(4),
    };
  }

  getCart(): Observable<CartState> {
    return this.selectState((state) => state);
  }

  addToCart(item: { name: string; quantity: number; unitPrice: string; totalPrice: string; item_id: number; uom: string }) {
    this.setState((state) => ({
      ...state,
      cart: [...state.cart, {
        ...item,
        unitPrice: parseFloat(item.unitPrice).toFixed(2),
        totalPrice: parseFloat(item.totalPrice).toFixed(2)
      }],
    }));
  }

  updateCartItem(item_id: number, quantity: number) {
    this.setState((state) => ({
      ...state,
      cart: state.cart.map((item) => {
        if (item.item_id === item_id) {
          return {
            ...item,
            quantity,
            totalPrice: (parseFloat(item.unitPrice) * quantity).toFixed(2)
          };
        }
        return item;
      })
    }));
  }

  deleteFromCart(index: number) {
    this.setState((state) => ({
      ...state,
      cart: [...state.cart.filter((_, i) => i !== index)],
    }));
  }

  clearCart() {
    this.setState((state) => ({
      ...state,
      cart: [],
      cart_id: this.generateUniqueId(4),
    }));
  }

  updateCart(items: Array<{ name: string; quantity: number; unitPrice: string; totalPrice: string; item_id: number; uom: string }>) {
    this.setState((state) => ({
      ...state,
      cart: items.map(item => ({
        ...item,
        unitPrice: parseFloat(item.unitPrice).toFixed(2),
        totalPrice: parseFloat(item.totalPrice).toFixed(2)
      })),
    }));
  }

  generateNewCartId() {
    const newId = this.generateUniqueId(6);
    this.setState((state) => ({
      ...state,
      cart_id: newId,
    }));
    return newId;
  }

  private generateUniqueId(length: number): string {
    return Math.random().toString(36).substring(2, 2 + length);
  }
}