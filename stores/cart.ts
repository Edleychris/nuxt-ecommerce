import { defineStore } from 'pinia';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity: number;
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
        existingProduct.quantity += 1;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(productId: number) {
      const index = this.items.findIndex(item => item.id === productId)
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    },
    increaseQuantity(productId: number) {
      const product = this.items.find(item => item.id === productId);
      if (product) {
        product.quantity += 1;
      }
    },
    decreaseQuantity(productId: number) {
      const product = this.items.find(item => item.id === productId);
      if (product) {
        if (product.quantity > 1) {
          product.quantity -= 1;
        } else {
          this.removeFromCart(productId);
        }
      }
    },
  },
  getters: {
    itemCount: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },
    totalPrice: (state) => {
      return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
});