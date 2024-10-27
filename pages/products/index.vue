<template>
    <div v-if="product">
      <img :src="product.image" alt="Product image" />
      <h1>{{ product.title }}</h1>
      <p>{{ product.description }}</p>
      <p>Price: ${{ product.price }}</p>
      <button @click="addToCart">Add to Cart</button>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </template>

  
  <script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { ref, onMounted } from 'vue';
  import { useCartStore } from '~/stores/cart';
  
  const route = useRoute();
  const cartStore = useCartStore();
  const product = ref<Product | null>(null);
  
  const fetchProduct = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${route.params.id}`);
      product.value = await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };
  
  onMounted(fetchProduct);
  
  const addToCart = () => {
    if (product.value) {
      cartStore.addToCart(product.value);
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>