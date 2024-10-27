<template>
  <div class="flex items-center justify-between py-6 px-20 border border-b-2">
    <div class="flex items-center gap-8">
      <h1 class="font-bold text-3xl">Logo</h1>
      <ul class="flex text-[#4B4B4D] font-bold text-base gap-4">
        <li>Electronics</li>
        <li>Health & Beauty</li>
        <li>Home & Office</li>
        <li>Computing</li>
      </ul>
    </div>
    <div class="flex items-center gap-6">
      <div class="border rounded-lg p-2 flex items-center gap-2">
        <img src="../assets/search.png" alt="">
        <input type="search" name="" id="" placeholder="Search" class="outline-none">
      </div>
      <div class="flex items-center gap-2">
        <img src="../assets/avatar.png" alt="">
        <p>Account</p>
      </div>
      <div class="flex items-center gap-2 relative">
        <img src="../assets/cart.png" alt="">
        <nuxt-link to="/cart">Cart</nuxt-link>
        <span class="cart-count absolute bg-[#2A54C7]flex px-2 rounded-full left-10 -top-3"
          v-if="cartStore?.itemCount">{{ cartStore.itemCount }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart';

const cartStore = useCartStore();
</script>

<style scoped>
.cart-count {
  margin-left: 10px;
  /* Space between the nav text and cart count */
  font-weight: bold;
  /* Make the count bold */
  color: #2A54C7;
  /* Optional: Color for the cart count */
}
</style>