import { defineStore } from 'pinia';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),
  
  getters: {
    itemCount(): number {
      return this.items.reduce((total, item) => total + item.quantity, 0);
    },
    
    totalPrice(): number {
      return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    cartIsEmpty(): boolean {
      return this.items.length === 0;
    }
  },
  
  actions: {
    addItem(item: Omit<CartItem, 'quantity'>) {
      const existingItem = this.items.find(i => i.id === item.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.items.push({ ...item, quantity: 1 });
      }
      
      // Save to localStorage to persist for unauthorized users
      this.saveToLocalStorage();
    },
    
    removeItem(itemId: number) {
      const index = this.items.findIndex(item => item.id === itemId);
      if (index !== -1) {
        this.items.splice(index, 1);
        this.saveToLocalStorage();
      }
    },
    
    updateQuantity(itemId: number, quantity: number) {
      const item = this.items.find(i => i.id === itemId);
      if (item) {
        item.quantity = quantity > 0 ? quantity : 1;
        this.saveToLocalStorage();
      }
    },
    
    clearCart() {
      this.items = [];
      this.saveToLocalStorage();
    },
    
    saveToLocalStorage() {
      if (process.client) {
        localStorage.setItem('cart', JSON.stringify(this.items));
      }
    },
    
    loadFromLocalStorage() {
      if (process.client) {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          this.items = JSON.parse(savedCart);
        }
      }
    }
  }
});
