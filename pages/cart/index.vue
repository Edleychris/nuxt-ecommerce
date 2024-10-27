<template>
    <div class="cart-page">
      <h1>Your Cart</h1>
      <div v-if="cartItems.length === 0">
        <p>Your cart is empty.</p>
      </div>
      <div v-else>
        <ul>
          <li v-for="item in cartItems" :key="item.id">
            <img :src="item.image" alt="Product Image" />
            <div>
              <h2>{{ item.title }}</h2>
              <p>Price: ${{ item.price }}</p>
              <button @click="removeFromCart(item.id)">Remove</button>
            </div>
          </li>
        </ul>
        <p>Total Items: {{ cartItems.length }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useCartStore } from '~/stores/cart';
  
  const cartStore = useCartStore();
  const cartItems = cartStore.items; // Access cart items
  
  const removeFromCart = (productId: number) => {
    cartStore.removeFromCart(productId); // Remove item from cart
  };
  </script>
  
  <style scoped>
  .cart-page {
    padding: 20px;
  }
  
  .cart-page img {
    width: 100px; /* Adjust as needed */
    height: auto; /* Maintain aspect ratio */
  }
  
  .cart-page ul {
    list-style-type: none; /* Remove bullet points */
    padding: 0; /* Remove default padding */
  }
  
  .cart-page li {
    display: flex;
    align-items: center;
    margin-bottom: 20px; /* Space between items */
  }
  
  .cart-page h1 {
    margin-bottom: 20px; /* Space below the title */
  }
  </style>