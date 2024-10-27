import { defineStore } from 'pinia';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity: number; // Add a quantity property
}

interface CartState {
  items: Product[];
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
  }),
  actions: {
    addToCart(product: Product) {
      const existingProduct = this.items.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if it already exists
      } else {
        this.items.push({ ...product, quantity: 1 }); // Add new product with quantity 1
      }
    },
    removeFromCart(productId: number) {
      this.items = this.items.filter(item => item.id !== productId);
    },
    increaseQuantity(productId: number) {
      const product = this.items.find(item => item.id === productId);
      if (product) {
        product.quantity += 1; // Increase quantity
      }
    },
    decreaseQuantity(productId: number) {
      const product = this.items.find(item => item.id === productId);
      if (product) {
        if (product.quantity > 1) {
          product.quantity -= 1; // Decrease quantity if more than 1
        } else {
          this.removeFromCart(productId); // Remove item if quantity is 1
        }
      }
    },
  },
  getters: {
    itemCount: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0); // Total item count
    },
    totalPrice: (state) => {
      return state.items.reduce((total, item) => total + item.price * item.quantity, 0); // Total price
    },
  },
});