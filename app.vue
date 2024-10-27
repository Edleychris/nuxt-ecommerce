<template>
  <div class="header">
    <nav-bar />
    <NuxtPage />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from '~/components/Footer.vue'
</script>

<style>
*,
::after,
::before {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.header {
  display: flex;
  flex-direction: column;
}

.cart-summary {
  font-size: 1rem;
}

.footer {
  text-align: center;
  padding: 1rem;
  border-top: 1px solid #ddd;
  background-color: #f8f8f8;
}
</style>